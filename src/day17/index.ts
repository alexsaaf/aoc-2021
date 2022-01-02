import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const findHighestIfSuccessful = (
  velocity: { x: number; y: number },
  target: { y: { min: number; max: number }; x: { min: number; max: number } },
): number => {
  let xVel = velocity.x;
  let yVel = velocity.y;
  let x = 0;
  let y = 0;
  let highestY = 0;
  while (true) {
    if (
      x >= target.x.min &&
      x <= target.x.max &&
      y >= target.y.min &&
      y <= target.y.max
    ) {
      // We hit the target area!
      return highestY;
    }

    // Update position.
    x += velocity.x;
    y += velocity.y;

    // Update velocity.
    if (xVel > 0) {
      xVel -= 1;
    } else if (xVel < 0) {
      xVel += 1;
    }
    yVel -= 1;

    if (y > highestY) {
      highestY = y;
    }
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const targetXMin = 0;
  const targetXMax = 0;
  const targetYMin = 0;
  const targetYMax = 0;

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
