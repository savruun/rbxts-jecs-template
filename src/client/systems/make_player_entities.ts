import type { System } from '@type/System';
import { Phase } from '@rbxts/planck';
import { for_all_players } from '@shared/util/for_all_players';
import { player_ref } from '@shared/refs/player_ref'

export const phase = Phase.PostStartup;

export const system: System = ({ world, ct, atoms }) => {
  for_all_players((player) => {
    // Create a ref for the player
    player_ref[player.Name] = world.entity();
  });
};
