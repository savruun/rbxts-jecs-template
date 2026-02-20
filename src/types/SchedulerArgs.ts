import type { world } from '@shared/world'
import type { Atoms } from './Atoms'
import type { CT } from './CT'

export type SchedulerArgs = [{world: typeof world, ct: CT, atoms: Atoms}]
