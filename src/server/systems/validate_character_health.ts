import type { System } from '@type/System';
import * as jecs from '@rbxts/jecs';

export const system: System = ({ world, ct }) => {
  for (const [e, health, humanoid] of world.query(
    jecs.pair(ct.health, ct.Dirty),
    ct.humanoid,
  )) {
    humanoid.Health = health.current;

    world.remove(e, jecs.pair(ct.health, ct.Dirty));
    world.set(e, jecs.pair(ct.health, ct.Clean), health);
  }
};
