/**
 *
 */

// Service imports
import { Players } from '@rbxts/services';

// Package imports
import * as replecs from '@rbxts/replecs';
import * as jecs from '@rbxts/jecs';
import { Trove } from '@rbxts/trove';
import { Dependency } from '@flamework/core';

// Net imports
import { set_multiple_reliable } from '@shared/net/replication/helpers';

// ECS Imports
import { has_ref, ref } from '@shared/ecs/ref';
import { collect } from '@shared/ecs/collect';
import { world } from '@shared/ecs/world';
import { ct } from '@shared/ecs/components';

// Type imports
import type { System } from '@type/System';
import type { Character } from '@type/Character';

// Server imports
import type { PlayerDataService } from '@server/services/player_data_service';
import { server_replicator } from '@server/replicator';

const player_data_service = Dependency<PlayerDataService>();

const [player_added] = collect<[Player]>(Players.PlayerAdded, () => {
  return Players.GetPlayers();
});

const [player_removing] = collect<[Player, Enum.PlayerExitReason]>(
  Players.PlayerRemoving,
);

const player_lifecycle: System = () => {
  for (const [_, player] of player_added) {
    if (has_ref(player)) continue; // If a ref was already established for this player skip them.

    const player_entity = create_player_entity(player);
    const client_entity = create_client_entity(player);

    const [character_added, disconnect] = collect<[Character]>(
      player.CharacterAdded,
      () => player.Character,
    );

    const trove = new Trove();
    trove.add(disconnect);

    world.set(player_entity, ct.cleanup, trove);
    world.set(player_entity, ct.character_added_stream, character_added);

    // Get persistent data and add the component to the client and player entities
    player_data_service.get_player_data(player).andThen((data) => {
      world.set(player_entity, ct.persistent_data, data);
      world.set(client_entity, ct.persistent_data, data);
    });
  }

  for (const [_, player, __] of player_removing) {
    server_replicator.remove_player_alias(ref(player));

    for (const [entity, plr] of world.query(jecs.pair(ct.Owner, ct.player))) {
      if (player !== plr) continue;
      world.delete(entity);
    }
  }
};

function create_client_entity(player: Player) {
  // Create a client entity
  const client_entity = ref(`client_${player.UserId}`);
  server_replicator.set_networked(client_entity, player); // Only replicate to owner player.
  server_replicator.set_custom(client_entity, ct.client_id); // Use a custom id for the client entity.

  world.set(client_entity, jecs.Name, `client_${player.UserId}`);
  world.add(client_entity, ct.Client); // Tag for queries
  world.set(client_entity, ct.client_id, player.UserId); // For custom id

  world.set(client_entity, jecs.pair(ct.Owner, ct.player), player); // Set ownership for cleanup reasons.

  // Set all reliable tags and components.
  set_multiple_reliable(
    client_entity,
    [ct.Client, ct.persistent_data, ct.client_id],
    undefined,
  );

  return client_entity;
}

function create_player_entity(player: Player) {
  // Create a player entity which is networked to clients
  const player_entity = ref(player);
  server_replicator.set_networked(player_entity);
  server_replicator.add_player_alias(player, player_entity);

  // Set the name meta tag for the player.
  world.set(player_entity, jecs.Name, player.Name);

  // Setup all reliable networked components for the player entity
  set_multiple_reliable(player_entity, [ct.Player, ct.player], undefined);
  world.add(player_entity, ct.Player); // Add the player tag for queries

  // Add ownership and player components
  jecs.bulk_insert(
    world,
    player_entity,
    [ct.player, jecs.pair(ct.Owner, ct.player)],
    [player, player],
  );

  // Use a custom id for the player entity
  server_replicator.set_custom(player_entity, ct.player);

  return player_entity;
}

export = {
  system: player_lifecycle,
};
