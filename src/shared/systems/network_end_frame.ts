import { Phases } from '@rbxts/planck-runservice';
import * as Routes from '@shared/net/routes';

const network_begin_frame = () => {
  Routes.endFrame();
};

export = {
  system: network_begin_frame,
  phase: Phases.Last,
};
