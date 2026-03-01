import type { System } from '@type/System';
import { world } from '@shared/ecs/world';
import { ct } from '@shared/ecs/components';
import { set_multiple_reliable } from '@shared/net/replication/helpers';
import { ref } from '@shared/ecs/ref';
import { cast } from '@shared/lib/cast';
import type { Character } from '@type/Character';

import * as replecs from '@rbxts/replecs';
import * as jecs from '@rbxts/jecs';
import { server_replicator } from '@server/replicator';

const character_bootstrapping: System = () => {
  for (const [player_entity, character_added] of world.query(
    ct.character_added_stream,
  )) {
    const player = world.get(player_entity, ct.player)!;

    for (const [_, character] of character_added) {
      // Delete any prior existing characters owned by this player.
      for (const [character_entity, plr] of world
        .query(ct.player)
        .with(ct.Character)) {
        if (plr !== player) continue;
        world.delete(character_entity);
      }

      for (const [tool_entity, plr] of world.query(
        jecs.pair(ct.Owner, ct.player),
        ct.Tool,
      )) {
        if (plr !== player) continue;
        world.delete(tool_entity);
      }
      create_character_entity(player, character);
    }
  }
};

function create_character_entity(player: Player, character: Character) {
  // Create a new character entity.
  const character_entity = ref(character);
  world.set(character_entity, replecs.networked, undefined);
  world.set(character_entity, jecs.Name, player.Name);

  // Setup all reliable networked components for the character entity
  set_multiple_reliable(
    character_entity,
    [ct.Character, ct.character, ct.health, ct.humanoid],
    undefined,
  );

  world.add(character_entity, ct.Character);
  world.set(character_entity, ct.character, cast<Character>(character));

  server_replicator.set_custom(character_entity, ct.character);

  world.set(
    character_entity,
    ct.humanoid,
    character.FindFirstChildOfClass('Humanoid')!,
  );

  jecs.bulk_insert(
    world,
    character_entity,
    [ct.player, jecs.pair(ct.Owner, ct.player)],
    [player, player],
  );

  world.set(character_entity, jecs.pair(ct.health, ct.Clean), {
    current: 100,
    max: 100,
  });
}

export = {
  system: character_bootstrapping,
};
