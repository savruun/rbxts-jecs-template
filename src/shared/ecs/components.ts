import Replecs from '@rbxts/replecs';
import { world } from './world';

import * as jecs from '@rbxts/jecs';
import type { Character } from '@type/Character';
import type { PersistentPlayerData } from '@type/PersistentPlayerData';
import type { Collected } from '@type/Collected';
import type { Trove } from '@rbxts/trove';

export const ct = {
  /** Easing Flags */
  Tween: world.entity(),
  Spring: world.entity(),

  /** Ownership Flags */
  Owner: world.entity(),

  /** Player Flags */
  Player: world.entity(),
  Character: world.entity(),
  Client: world.entity(),

  /** Tool Flags */
  Tools: world.entity(),
  Tool: world.entity(), // Used for Tool queries
  Is_Equipped: world.entity(),

  /** Value Sanitization Flags */
  Dirty: world.entity(),
  Clean: world.entity(),

  /** Utility Components */
  timer: world.component<number>(),
  transform: world.component<CFrame>(),

  /** Player Components */
  player: world.component<Player>(),
  character: world.component<Character>(),
  client_id: world.component<number>(), // For client custom ids
  humanoid: world.component<Humanoid>(),
  persistent_data: world.component<PersistentPlayerData>(),
  character_added_stream: world.component<Collected<[Character]>>(),

  /** Reference Components */
  ref: world.component<defined>(),
  instance: world.component<Instance>(),

  /** Data Components */
  meta: world.component<Record<string, unknown>>(),
  health: world.component<{ max: number; current: number }>(),
  cleanup: world.component<Trove>(),
};

for (const [name, component] of pairs(ct)) {
  world.add(component, Replecs.shared);
  world.set(component, jecs.Name, name);
}
