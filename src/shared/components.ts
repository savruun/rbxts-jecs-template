import Replecs from '@rbxts/replecs';
import { world } from './world';

import * as jecs from '@rbxts/jecs';
import type { Character } from '@type/Character';

export const ct = {
  /** Easing Flags */
  Tween: jecs.new_low_id(world),
  Spring: jecs.new_low_id(world),

  /** Ownership Flags */
  Owner: jecs.new_low_id(world),

  /** Player Flags */
  Player: jecs.new_low_id(world),
  Character: jecs.new_low_id(world),
  
  /** Value Sanitization Flags */
  Dirty: jecs.new_low_id(world),
  Clean: jecs.new_low_id(world),

  /** Utility Components */
  timer: world.component<number>(),
  transform: world.component<CFrame>(),

  /** Player Components */
  player: world.component<Player>(),
  character: world.component<Character>(),
  humanoid: world.component<Humanoid>(),

  /** Reference Components */
  ref: world.component<defined>(),
  instance: world.component<Instance>(),
  
  /** Data Components */
  meta: world.component<Record<string, unknown>>(),
  health: world.component<{ max: number; current: number }>(),
};

for (const [name, component] of pairs(ct)) {
  world.add(component, Replecs.shared);
  world.set(component, jecs.Name, name);
}
