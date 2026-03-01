import type { System } from '@rbxts/planck';
import type { SchedulerArgs } from '@type/SchedulerArgs';

export function load_systems(folder: Folder): Array<System<SchedulerArgs>> {
  const systems: Array<System<SchedulerArgs>> = [];

  for (const child of folder.GetDescendants()) {
    if (!child.IsA('ModuleScript')) continue;

    const [success, system] = pcall(
      () => require(child) as System<SchedulerArgs>,
    );

    if (success) {
      systems.push(system);
    }
  }

  return systems;
}
