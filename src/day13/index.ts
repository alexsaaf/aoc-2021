import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const [dotsInput, foldsInput] = rawInput
    // Split on new line
    .split("\n\n")
    // Remove blank lines
    .filter((p) => p.trim());

  const dots = dotsInput.split(/\r?\n/).map((dot) => {
    return {
      x: parseInt(dot.split(",")[0]),
      y: parseInt(dot.split(",")[1]),
    };
  });
  const folds = foldsInput.split(/\r?\n/).map((fold) => {
    const components = fold.split(" ")[2].split("=");
    return {
      direction: components[0],
      amount: parseInt(components[1]),
    };
  });

  return {
    dots,
    folds,
  };
};

const applyFolds = (
  dot: { x: number; y: number },
  folds: { direction: string; amount: number }[],
): { x: number; y: number } => {
  let x = dot.x;
  let y = dot.y;
  folds.forEach((fold) => {
    if (fold.direction === "x" && x > fold.amount) {
      const distance = x - fold.amount;
      x = fold.amount - distance;
    } else if (fold.direction === "y" && y > fold.amount) {
      const distance = y - fold.amount;
      y = fold.amount - distance;
    }
  });

  return {
    x,
    y,
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = new Map<string, number>();

  input.dots.forEach((dot) => {
    const finalPosition = applyFolds(dot, input.folds.slice(0, 1));
    const stringRep = `x:${finalPosition.x}.y:${finalPosition.y}`;
    if (!map.has(stringRep)) {
      map.set(stringRep, 1);
    }
  });

  return [...map.values()].reduce((acc, next) => acc + next, 0);
};

const calculateSize = (
  initial: number[],
  folds: { direction: string; amount: number }[],
): { x: number; y: number } => {
  let [x, y] = initial;
  folds.forEach((fold) => {
    if (fold.direction === "x") {
      x = fold.amount;
    } else if (fold.direction === "y") {
      y = fold.amount;
    }
  });
  return {
    x,
    y,
  };
};

const draw = (size: { x: number; y: number }, map: string[][]) => {
  for (let y = 0; y < size.y; y++) {
    let line = "";
    for (let x = 0; x < size.x; x++) {
      line += map[y][x];
    }
    console.log(line);
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const maxY = Math.max(...input.dots.map((dot) => dot.y));
  const maxX = Math.max(...input.dots.map((dot) => dot.x));

  const map = new Array(maxY).fill(0).map(() => new Array(maxX).fill("."));
  input.dots.forEach((dot) => {
    const finalPosition = applyFolds(dot, input.folds);
    if (finalPosition.x >= 0 && finalPosition.y >= 0) {
      map[finalPosition.y][finalPosition.x] = "#";
    }
  });

  const finalSize = calculateSize([maxX, maxY], input.folds);
  draw(finalSize, map);
  return "BLKJRBAG"; // Read this from the output.
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
