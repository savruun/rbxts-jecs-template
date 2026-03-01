import * as Axis from '@rbxts/axis';

const mb1_input_map = [Enum.UserInputType.MouseButton1];
const mb2_input_map = [Enum.UserInputType.MouseButton2];
const mouse_movement = [Enum.UserInputType.MouseMovement];

export const inputs = {
  mb1: Axis.input<typeof mb1_input_map>(mb1_input_map),
  mb2: Axis.input<typeof mb2_input_map>(mb2_input_map),
  input_delta: Axis.input<typeof mouse_movement>(mouse_movement),
};
