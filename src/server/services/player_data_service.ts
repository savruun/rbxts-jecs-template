import { type OnStart, Service } from '@flamework/core';
import type { PersistentPlayerData } from '@type/PersistentPlayerData';
import Lyra from '@rbxts/lyra';
import { Players } from '@rbxts/services';

import {
  player_data_template,
  player_data_schema,
} from '@shared/gameplay/data/player_data';

@Service()
export class PlayerDataService implements OnStart {
  private loading = new Map<number, Promise<void>>();

  private store = Lyra.createPlayerStore({
    name: 'player_data',
    template: player_data_template,
    schema: player_data_schema,
  });

  public onStart() {
    Players.PlayerAdded.Connect(async (player) => {
      await this.ensure_loaded(player);
    });

    Players.PlayerRemoving.Connect((player) => {
      this.store.unloadAsync(player);
      this.loading.delete(player.UserId);
    });

    game.BindToClose(() => {
      this.store.closeAsync();
    });
  }

  private async ensure_loaded(player: Player) {
    const existing = this.loading.get(player.UserId);
    if (existing) return existing;

    const promise = this.store.load(player);
    this.loading.set(player.UserId, promise);

    promise.finally(() => {
      this.loading.delete(player.UserId);
    });

    return promise;
  }

  public async get_player_data(player: Player): Promise<PersistentPlayerData> {
    await this.ensure_loaded(player);
    return this.store.getAsync(player);
  }

  public async update_player_data(
    player: Player,
    transformFunction: (data: PersistentPlayerData) => boolean,
  ): Promise<boolean> {
    await this.ensure_loaded(player);
    return this.store.updateAsync(player, transformFunction);
  }
}
