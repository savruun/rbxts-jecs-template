import { Service, type OnStart } from '@flamework/core';
import { Centurion } from '@rbxts/centurion';
import { server, shared } from '@shared/lib/paths';

const commands_container: Folder = server!.WaitForChild('commands') as Folder;

const types_container: Folder = shared
  .WaitForChild('gameplay')
  .WaitForChild('admin') as Folder;

@Service()
export class CenturionService implements OnStart {
  private server = Centurion.server();

  public onStart() {
    this.server.registry.load(commands_container);
    this.server.registry.load(types_container);

    this.server.start();
  }
}
