import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\r?\n/)
    .map((row) => ({ command: row.split(" ")[0], amount: +row.split(" ")[1] }));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let depth = 0;
  let horizontal_position = 0;

  input.forEach((value) => {
    if (value.command === "forward") {
      horizontal_position += value.amount;
    } else {
      depth += (value.command === "up" ? -1 : 1) * value.amount;
    }
  });

  return horizontal_position * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let aim = 0;
  let depth = 0;
  let horizontal_position = 0;

  input.forEach((value) => {
    if (value.command === "forward") {
      horizontal_position += value.amount;
      depth += aim * value.amount;
    } else {
      aim += (value.command === "up" ? -1 : 1) * value.amount;
    }
  });

  return depth * horizontal_position;
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
