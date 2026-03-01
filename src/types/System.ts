export type System = (args: {
  world: import('@rbxts/jecs').World;
  ct: import('./CT').CT;
}) => void;
