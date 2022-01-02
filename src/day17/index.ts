import run from "aocrunner";

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
    x += xVel;
    y += yVel;

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

    if (y < target.y.min) {
      return -1;
    }
    if (x > target.x.max) {
      return -1;
    }
  }
};

const part1 = (rawInput: string) => {
  // Read input manually.
  const targetXMin = 185;
  const targetXMax = 221;
  const targetYMin = -122;
  const targetYMax = -74;

  let maxHeight = 0;

  for (let xVel = 0; xVel <= targetXMax; xVel++) {
    // Ugly, but not sure how to decide which to check otherwise.
    for (let yVel = -1000; yVel < 2000; yVel++) {
      let height = findHighestIfSuccessful(
        { x: xVel, y: yVel },
        {
          y: { min: targetYMin, max: targetYMax },
          x: { min: targetXMin, max: targetXMax },
        },
      );
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
  }

  return maxHeight;
};

const part2 = (rawInput: string) => {
  // Read input manually.
  const targetXMin = 185;
  const targetXMax = 221;
  const targetYMin = -122;
  const targetYMax = -74;

  let hittingVelocities = 0;

  for (let xVel = 0; xVel <= targetXMax; xVel++) {
    // Ugly, but not sure how to decide which to check otherwise.
    for (let yVel = -1000; yVel < 2000; yVel++) {
      let height = findHighestIfSuccessful(
        { x: xVel, y: yVel },
        {
          y: { min: targetYMin, max: targetYMax },
          x: { min: targetXMin, max: targetXMax },
        },
      );
      if (height >= 0) {
        hittingVelocities++;
      }
    }
  }

  return hittingVelocities;
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
