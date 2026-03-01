import { server_replicator } from '@server/replicator';
import { routes } from '@shared/net/routes';
import type { System } from '@type/System';
import { interval } from '@shared/ecs/interval';

const updates_interval = interval(1 / 20);
const unreliables_interval = interval(1 / 30);

const replecs_server: System = () => {
  if (updates_interval()) {
    for (const [player, buf, variants] of server_replicator.collect_updates()) {
      print(player, buf, variants);
      routes.updates.send(buf, variants as defined[][]).to(player);
    }
  }

  if (unreliables_interval()) {
    for (const [
      player,
      buf,
      variants,
    ] of server_replicator.collect_unreliable()) {
      routes.unreliable_updates.send(buf, variants as defined[][]).to(player);
    }
  }
};

export = {
  system: replecs_server,
};
