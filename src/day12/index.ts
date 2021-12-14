import run from "aocrunner";
import { deflateSync } from "zlib";

const parseInput = (rawInput: string) => {
  const map = new Map<string, string[]>();
  rawInput
    .split(/\r?\n/)
    .map((row) => {
      return row.split("-");
    })
    .forEach((row) => {
      if (map.has(row[0])) {
        map.get(row[0])?.push(row[1]);
      } else {
        map.set(row[0], [row[1]]);
      }

      if (map.has(row[1])) {
        map.get(row[1])?.push(row[0]);
      } else {
        map.set(row[1], [row[0]]);
      }
    });
  return map;
};

const find_all_paths = (
  map: Map<string, string[]>,
  start: string,
  end: string,
  path: string[],
  validNode: (path: string[], node: string) => boolean,
): string[][] => {
  const newPath = [...path, start];

  if (start === end) {
    return [newPath];
  }

  const paths: string[][] = [];

  map.get(start)?.forEach((node) => {
    if (validNode(newPath, node)) {
      const newPaths = find_all_paths(map, node, end, newPath, validNode);
      paths.push(...newPaths);
    }
  });
  return paths;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const validNode = (path: string[], node: string): boolean => {
    if (node !== node.toUpperCase() && path.includes(node)) {
      return false;
    }
    return true;
  };

  const paths = find_all_paths(input, "start", "end", [], validNode);

  return paths.length;
};

const uniqueSize = (array: string[]): number => {
  return new Set(array).size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const validNode = (path: string[], node: string): boolean => {
    if (node === "start" && path.includes(node)) return false;

    if (node === "end" && path.includes(node)) return false;

    if (node !== node.toUpperCase() && path.includes(node)) {
      const smallLetters = path.filter(
        (pathNode) => pathNode !== pathNode.toUpperCase(),
      );
      const uniqueSmallLetters = uniqueSize(smallLetters);

      return smallLetters.length === uniqueSmallLetters;
    }

    return true;
  };

  const paths = find_all_paths(input, "start", "end", [], validNode);

  return paths.length;
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
