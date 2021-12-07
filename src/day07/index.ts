import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map((val) => +val);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const max = Math.max(...input);

  let lowestCost = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < max; i++) {
    const cost = input.reduce((acc, val) => acc + Math.abs(i - val), 0);
    if (cost < lowestCost) {
      lowestCost = cost;
    }
  }
  return lowestCost;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const max = Math.max(...input);

  let lowestCost = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < max; i++) {
    const cost = input.reduce((acc, val) => {
      const n = Math.abs(i - val);
      return acc + (n * (n + 1)) / 2;
    }, 0);
    if (cost < lowestCost) {
      lowestCost = cost;
    }
  }
  return lowestCost;
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
