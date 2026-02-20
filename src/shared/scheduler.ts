import { Scheduler } from '@rbxts/planck';
import PlanckJabby from '@rbxts/planck-jabby';
import PlanckRunService from '@rbxts/planck-runservice';

import { world } from './world';
import { atoms } from './atoms';
import { ct } from './components';

const jabby_plugin = new PlanckJabby();
const run_service_plugin = new PlanckRunService.Plugin();

const scheduler = new Scheduler({ world, ct, atoms })
  .addPlugin(jabby_plugin)
  .addPlugin(run_service_plugin);

export { scheduler };
