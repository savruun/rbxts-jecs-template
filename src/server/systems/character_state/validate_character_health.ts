import type { System } from '@type/System';
import * as jecs from '@rbxts/jecs';

const validate_character_health: System = ({ world, ct }) => {
  for (const [e, health, humanoid] of world.query(
    jecs.pair(ct.health, ct.Dirty),
    ct.humanoid,
  )) {
    humanoid.Health = health.current;

    world.remove(e, jecs.pair(ct.health, ct.Dirty));
    world.set(e, jecs.pair(ct.health, ct.Clean), health);
  }
};

export = {
  system: validate_character_health,
};
