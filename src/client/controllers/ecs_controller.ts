import { Controller, type OnStart } from '@flamework/core';
import { client, shared } from '@shared/lib/paths';
import { load_systems } from '@shared/ecs/load_systems';
import { world } from '@shared/ecs/world';
import { client_replicator } from '@client/replicator';
import { Functions } from '@client/network';
import { startup } from '@shared/core/startup';

@Controller({ loadOrder: 1 })
export class ECSController implements OnStart {
  private readonly systems = load_systems(
    client.WaitForChild('systems') as Folder,
  );
  private readonly shared_systems = load_systems(
    shared.WaitForChild('systems') as Folder,
  );

  public async onStart() {
    startup([...this.systems, ...this.shared_systems]);
    await this.start_replication();
  }

  private async start_replication() {
    client_replicator.init(world);

    const [buf, variants] = await Functions.recieveFull.invoke();
    client_replicator.apply_full(buf, variants);
  }
}
