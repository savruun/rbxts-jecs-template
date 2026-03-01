import { Service, type OnStart } from '@flamework/core';
import { Functions } from '@server/network';
import { server_replicator } from '@server/replicator';
import { server, shared } from '@shared/lib/paths';
import { load_systems } from '@shared/ecs/load_systems';
import { startup } from '@shared/core/startup';

@Service({ loadOrder: 1 })
export class ECSService implements OnStart {
  private readonly systems = load_systems(
    server?.WaitForChild('systems') as Folder,
  );

  private readonly shared_systems = load_systems(
    shared.WaitForChild('systems') as Folder,
  );

  public onStart() {
    startup([...this.systems, ...this.shared_systems]);
    this.start_replication();
  }

  private start_replication() {
    server_replicator.init();

    Functions.recieveFull.setCallback((player) => {
      server_replicator.mark_player_ready(player);

      const [buf, variants] = server_replicator.get_full(player);
      return [buf, variants] as [buffer, defined[][]];
    });
  }
}
