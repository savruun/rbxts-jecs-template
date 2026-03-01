import { client_replicator } from '@client/replicator';
import type { System } from '@type/System';

import { routes } from '@shared/net/routes';

const replecs_client: System = () => {
  for (const [_, buf, variants] of routes.updates.query().client()) {
    client_replicator.apply_updates(buf, variants);
  }

  for (const [_, buf, variants] of routes.unreliable_updates.query().client()) {
    client_replicator.apply_unreliable(buf, variants);
  }
};

export = {
  system: replecs_client,
};
