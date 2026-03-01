import jabby from '@rbxts/jabby';
import type { System } from '@rbxts/planck';
import { ContextActionService, RunService } from '@rbxts/services';
import { scheduler } from './/scheduler';

import { world } from '@shared/ecs/world';

import type { CT } from '@type/CT';
import type { Atoms } from '@type/Atoms';

let is_widget_open = false;

export function startup(systems: System<[{ world: typeof world; ct: CT }]>[]) {
  if (systems.size() !== 0) {
    scheduler.addSystems(systems);
  }

  if (RunService.IsClient()) {
    const client = jabby.obtain_client();

    const create_widget = (_: string, state: Enum.UserInputState) => {
      if (state !== Enum.UserInputState.Begin) return;

      if (!is_widget_open) {
        client.spawn_app(client.apps.home);
      } else {
        client.unmount_all();
      }

      is_widget_open = !is_widget_open;
    };

    ContextActionService.BindAction(
      'open-jabby',
      create_widget,
      false,
      Enum.KeyCode.F4,
    );
  }

  jabby.register({
    applet: jabby.applets.world,
    name: 'jecs-world',
    configuration: { world },
  });

  scheduler.runAll();
}
