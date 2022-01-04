import run from "aocrunner";

interface NestedArray<T> extends Array<T | NestedArray<T>> {}

type SnailEntry = {
  path: string;
  value: number;
};

const parseInput = (rawInput: string): NestedArray<number>[] => {
  return rawInput.split(/\r?\n/).map((row) => {
    return JSON.parse(row);
  });
};

const flatten = (
  snail: NestedArray<number> | number,
  path = "",
): SnailEntry[] => {
  if (typeof snail === "number") {
    return [{ path, value: snail as number }];
  } else {
    return snail.flatMap((s, i) => flatten(s, path + i));
  }
};

const toSnail = (
  paths: SnailEntry[],
  path = "",
  map = new Map(paths.map((snail) => [snail.path, snail.value])),
): NestedArray<number> | number => {
  if (map.has(path)) {
    return map.get(path)!;
  } else {
    return [0, 1].map((v) => toSnail(paths, path + v, map));
  }
};

const explode = (
  snail: SnailEntry[],
): { exploded: boolean; snail: SnailEntry[] } => {
  const index = snail.findIndex((snailEntry) => snailEntry.path.length === 5);

  if (index === -1) {
    return { exploded: false, snail };
  }

  if (index > 0) {
    const l = snail[index].value;
    snail[index - 1].value += l;
  }

  if (index < snail.length - 2) {
    const r = snail[index + 1].value;
    snail[index + 2].value += r;
  }

  return {
    exploded: true,
    snail: [
      ...snail.slice(0, index),
      { path: snail[index].path.slice(0, -1), value: 0 },
      ...snail.slice(index + 2),
    ],
  };
};

const split = (
  snail: SnailEntry[],
): { split: boolean; snail: SnailEntry[] } => {
  const index = snail.findIndex((entry) => entry.value > 9);

  if (index === -1) {
    return { split: false, snail };
  }

  const { path, value } = snail[index];

  const left: SnailEntry = { path: path + "0", value: Math.floor(value / 2) };
  const right: SnailEntry = { path: path + "1", value: Math.ceil(value / 2) };

  return {
    split: true,
    snail: [...snail.slice(0, index), left, right, ...snail.slice(index + 1)],
  };
};

const reduce = (snail: NestedArray<number>): NestedArray<number> => {
  let flatSnail = flatten(snail);

  let didChange = true;

  while (didChange) {
    didChange = false;

    const explodeRes = explode(flatSnail);
    flatSnail = explodeRes.snail;
    didChange = explodeRes.exploded;

    if (!didChange) {
      const splitRes = split(flatSnail);
      flatSnail = splitRes.snail;
      didChange = splitRes.split;
    }
  }

  return toSnail(flatSnail) as NestedArray<number>;
};

const magnitude = (snail: NestedArray<number>): number => {
  return snail
    .map((v, i) => (i === 0 ? 3 : 2) * (Array.isArray(v) ? magnitude(v) : v))
    .reduce((res, next) => res + next, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const res = input.reduce((result, snail) => reduce([result, snail]));

  console.log(flatten(res));
  return magnitude(res);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let highest = 0;
  for (let a = 0; a < input.length; a++) {
    for (let b = 0; b < input.length; b++) {
      if (a === b) {
        continue;
      }

      const res = magnitude(reduce([input[a], input[b]]));
      if (res > highest) {
        highest = res;
      }
    }
  }

  return highest;
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
