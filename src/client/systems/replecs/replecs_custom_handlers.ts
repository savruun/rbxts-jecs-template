import { Phase } from '@rbxts/planck';
import Replecs from '@rbxts/replecs';
import { ref } from '@shared/ref';
import { player_ref } from '@shared/refs/player_ref'
import type { System } from '@type/System';

export const phase = Phase.Startup;

export const system: System = ({ world, ct }) => {
  world.set(ct.player, Replecs.custom_handler, (player: Player) => {
    return player_ref[player.Name];
  });
};
