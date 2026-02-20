import { Phase } from '@rbxts/planck';
import { Players } from '@rbxts/services';
import * as replecs from '@rbxts/replecs';
import type { System } from '@type/System';
import { Trove } from '@rbxts/trove';
import { cast } from '@shared/util/cast';
import type { Character } from '@type/Character';
import * as jecs from '@rbxts/jecs';
import { set_multiple_reliable } from '@shared/util/replication';
import { server_replicator } from '@server/replicator';
import { character_ref } from '@ref/character_ref';
import { player_ref } from '@shared/refs/player_ref';

// System:
export const phase = Phase.PostStartup;

export const system: System = ({ world, ct }) => {
  const player_added = (player: Player) => {
    // Create a player entity which is networked to clients
    const player_entity = world.entity();
    world.set(player_entity, replecs.networked, undefined);
    world.set(player_entity, jecs.Name, player.Name);

    // Setup all reliable networked components for the player entity
    set_multiple_reliable(
      player_entity,
      [ct.Player, ct.money, ct.player],
      undefined,
    );

    server_replicator.set_custom(player_entity, ct.player);

    world.add(player_entity, ct.Player);

    world.set(player_entity, ct.player, player);
    world.set(player_entity, jecs.pair(ct.Owner, ct.player), player);

    const trove = new Trove();

    const character_added = (character: Model) => {
      for (const [e, _, plr] of world.query(ct.Character, ct.player)) {
        if (plr !== player) continue;
        world.delete(e);
      }

      const character_entity = world.entity();
      world.set(character_entity, replecs.networked, undefined);
      world.set(character_entity, jecs.Name, player.Name);

      // Setup all reliable networked components for the character entity
      set_multiple_reliable(
        character_entity,
        [
          ct.Character,
          ct.awakening,
          ct.character,
          ct.moveset,
          ct.health,
          ct.humanoid,
        ],
        undefined,
      );

      world.add(character_entity, ct.Character);
      world.set(character_entity, ct.character, cast<Character>(character));
      world.set(
        character_entity,
        ct.humanoid,
        character.FindFirstChildOfClass('Humanoid')!,
      );

      world.set(character_entity, jecs.pair(ct.Owner, ct.player), player);
      world.set(character_entity, ct.awakening, { progress: 0, active: false });
      world.set(character_entity, ct.moveset, 'Honored One');
      world.add(character_entity, ct.Idle);

      world.set(character_entity, jecs.pair(ct.health, ct.Clean), {
        current: 100,
        max: 100,
      });

      character_ref[player.Name] = character_entity;
    };

    // If the character already exists run characterAdded
    if (player.Character) {
      character_added(player.Character);
    }

    // Add the CharacterAdded to their trove.
    trove.add(player.CharacterAdded.Connect(character_added));
    trove.attachToInstance(player);
    
    player_ref[player.Name] = player_entity;
  };

  // When a player leaves clean up all their entities
  const player_removing = (player: Player) => {
    for (const [entity, plr] of world.query(jecs.pair(ct.Owner, ct.player))) {
      if (player !== plr) continue;
      world.delete(entity);
    }
  };

  // Run platform player added for existing players
  for (const player of Players.GetPlayers()) {
    player_added(player);
  }

  // Connect to player added and removing events
  Players.PlayerAdded.Connect(player_added);
  Players.PlayerRemoving.Connect(player_removing);
};
