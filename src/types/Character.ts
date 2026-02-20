export type Character = Model & {
  LeftArm: BasePart
  RightArm: BasePart
  LeftLeg: BasePart
  RightLeft: BasePart
  HumanoidRootPart: BasePart
  Torso: BasePart
  Humanoid: Humanoid & {
    Animator: Animator
  }
}
