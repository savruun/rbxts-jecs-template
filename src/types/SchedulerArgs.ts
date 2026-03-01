import type { world } from '@shared/ecs/world';
import type { CT } from './CT';

export type SchedulerArgs = [{ world: typeof world; ct: CT }];
