import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(/\r?\n/).map((row) => +row);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce((count: number, value: number, idx: number) => {
    return value < input[idx + 1] ? count + 1 : count;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;
  for (let i = 1; i < input.length - 2; i++) {
    const firstSum = input[i - 1] + input[i] + input[i + 1];
    const secondSum = input[i] + input[i + 1] + input[i + 2];
    if (firstSum < secondSum) {
      count++;
    }
  }

  return count;
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
