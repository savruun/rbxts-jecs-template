import { nominalTypeHack } from '@rbxts/react/src/prop-types'

export function interval(s: number) {
  let pin: number | undefined

  const throttle = () => {
    if (!pin) {
      pin = os.clock()
    }

    const elapsed = os.clock() - pin > s
    if (elapsed) {
      pin = os.clock()
    }

    return elapsed
  }

  return throttle
}
