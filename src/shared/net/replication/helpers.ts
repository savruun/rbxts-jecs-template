import * as jecs from '@rbxts/jecs';
import Replecs from '@rbxts/replecs';

import { world } from '@shared/ecs/world';

export function set_multiple_reliable(
  entity: jecs.Entity,
  components: jecs.Entity[],
  memberFilter: Replecs.MemberFilter | undefined,
) {
  for (const e of components) {
    world.set(entity, jecs.pair(Replecs.reliable, e), memberFilter);
  }
}

export function set_multiple_unreliable(
  entity: jecs.Entity,
  components: jecs.Entity[],
  memberFilter: Replecs.MemberFilter | undefined,
) {
  for (const e of components) {
    world.set(entity, jecs.pair(Replecs.unreliable, e), memberFilter);
  }
}
