import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(",").map((val) => +val);

const countFishesRec = (
  reproduceAt: number,
  targetTime: number,
  cache: Map<number, number>,
): number => {
  if (reproduceAt > targetTime) {
    return 0;
  }

  if (cache.has(reproduceAt)) {
    return cache.get(reproduceAt)!;
  }

  const newCount =
    1 +
    countFishesRec(reproduceAt + 7, targetTime, cache) +
    countFishesRec(reproduceAt + 9, targetTime, cache);
  cache.set(reproduceAt, newCount);
  return newCount;
};

const calculateFishes = (input: number[], target: number) => {
  let count = input.length;
  let cache = new Map<number, number>();
  input.forEach((fishState) => {
    count += countFishesRec(fishState + 1, target, cache);
  });
  return count;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return calculateFishes(input, 80);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return calculateFishes(input, 256);
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
