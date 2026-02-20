import { Events } from '@client/network';
import { collect } from '@util/collect';
import type { Connectable } from '@type/Connectable';
import { cast } from '@shared/util/cast';
import { client_replicator } from '@client/replicator';
import type { System } from '@type/System';

const updates = collect<[() => void, buffer, unknown[][]]>(
  cast<Connectable>(Events.sendUpdates),
);

const unreliables = collect<[() => void, buffer, unknown[][]]>(
  cast<Connectable>(Events.sendUnreliables),
);

// System
export const system: System = () => {
  for (const [_, buf, variants] of updates) {
    client_replicator.apply_updates(buf, variants);
  }

  for (const [_, buf, variants] of unreliables) {
    client_replicator.apply_unreliable(buf, variants);
  }
};
