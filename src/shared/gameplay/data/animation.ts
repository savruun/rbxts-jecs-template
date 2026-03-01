function animation(assetId: string) {
  const anim = new Instance('Animation');
  anim.AnimationId = `rbxassetid://${assetId}`;
  return anim;
}

export const animations = {
};
