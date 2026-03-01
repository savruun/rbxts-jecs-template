import { Scheduler } from '@rbxts/planck';
import PlanckJabby from '@rbxts/planck-jabby';
import PlanckRunService from '@rbxts/planck-runservice';

import { world } from '@shared/ecs/world';
import { ct } from '@shared/ecs/components';

const jabby_plugin = new PlanckJabby();
const run_service_plugin = new PlanckRunService.Plugin();

const scheduler = new Scheduler({ world, ct })
  .addPlugin(jabby_plugin)
  .addPlugin(run_service_plugin);

export { scheduler };
