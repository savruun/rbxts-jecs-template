/**
 * @author savruun
 * @description Sets replecs specific world hooks.
 * @date 20260225
 */

// Package imports
import { Phase } from '@rbxts/planck';
import Replecs from '@rbxts/replecs';

// Module imports
import { ref } from '@shared/ecs/ref';
import { client_replicator } from '@client/replicator';

// Type imports
import type { System } from '@type/System';
import type { Character } from '@type/Character';

const replecs_client_hooks: System = ({ world, ct }) => {
  // Maps global replication IDs to entities.
  // Currently a placeholder until required.
  client_replicator.handle_global((id: number) => {
    return world.entity();
  });

  // Resolves replicated Player instances to ECS entities.
  world.set(ct.player, Replecs.custom_handler, (player: Player) => {
    return ref(player);
  });

  // Resolves replicated Character instances to ECS entities.
  world.set(ct.character, Replecs.custom_handler, (character: Character) => {
    return ref(character);
  });

  // Maps the client entity (specific for client) to a ref.
  world.set(ct.client_id, Replecs.custom_handler, () => {
    return ref('client');
  });
};

export = {
  system: replecs_client_hooks,
  phase: Phase.Startup,
};
