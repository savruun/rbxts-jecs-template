import { Controller, type OnStart } from '@flamework/core';
import { Centurion } from '@rbxts/centurion';
import { CenturionUI } from '@rbxts/centurion-ui';
import { shared } from '@shared/lib/paths';
import { Players } from '@rbxts/services';

const types_container = shared
  .WaitForChild('gameplay')
  .WaitForChild('admin') as Folder;

@Controller()
export class CenturionController implements OnStart {
  private client = Centurion.client();

  public onStart() {
    this.client.registry.load(types_container);

    this.client
      .start()
      .then(() => CenturionUI.start(Centurion.client(), {}))
      .catch((err) => warn('Failed to start Centurion:', err));
  }
}
