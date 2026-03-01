import { Players } from '@rbxts/services';

/**
 * Runs a callback for all existing Players and Players who join.
 * @param callback Callback to run for all players.
 * @returns PlayerAdded subscription.
 */
export function for_all_players(callback: (player: Player) => void) {
  for (const player of Players.GetPlayers()) {
    callback(player);
  }

  return Players.PlayerAdded.Connect(callback);
}
