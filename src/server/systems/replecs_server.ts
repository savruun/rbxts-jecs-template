import { Events } from '@server/network';
import { server_replicator } from '@server/replicator';
import { interval } from '@util/interval';

const updates_interval = interval(1 / 20);
const unreliables_interval = interval(1 / 30);

export function system() {
  if (updates_interval()) {
    for (const [player, buf, variants] of server_replicator.collect_updates()) {
      print(buf, variants);
      Events.sendUpdates.fire(player, buf, variants);
    }
  }

  if (unreliables_interval()) {
    for (const [
      player,
      buf,
      variants,
    ] of server_replicator.collect_unreliable()) {
      Events.sendUnreliables.fire(player, buf, variants);
    }
  }
}
