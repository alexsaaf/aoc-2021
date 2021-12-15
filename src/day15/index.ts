import run from "aocrunner";
import { priorityQueue } from "./priorityQueue.js";

const parseInput = (rawInput: string) => {
  return rawInput.split(/\r?\n/).map((row) => {
    return row.split("").map((x) => parseInt(x));
  });
};

type Point = { x: number; y: number };

const isSamePoint = (a: Point, b: Point): boolean => {
  return a.x === b.x && a.y === b.y;
};

const getNeighbors = (point: Point, map: number[][]): Point[] => {
  const neighbors = [];

  if (point.x > 0) {
    neighbors.push({ x: point.x - 1, y: point.y });
  }
  if (point.x < map[0].length - 1) {
    neighbors.push({ x: point.x + 1, y: point.y });
  }

  if (point.y > 0) {
    neighbors.push({ y: point.y - 1, x: point.x });
  }
  if (point.y < map.length - 1) {
    neighbors.push({ y: point.y + 1, x: point.x });
  }

  return neighbors;
};

const pointToString = (point: Point): string => {
  return `x:${point.x},y:${point.y}`;
};

const manhattanDistance = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

// Pretty standard A*
const find_cheapest_path = (
  map: number[][],
  start: Point,
  end: Point,
): number => {
  const frontier = priorityQueue<Point>();
  frontier.insert(start, 0);

  const cost = new Map<string, number>();
  cost.set(pointToString(start), 0);

  while (!frontier.isEmpty()) {
    const current = frontier.pop()!;

    if (isSamePoint(current, end)) {
      break;
    }

    for (let neighbor of getNeighbors(current, map)) {
      const newCost =
        cost.get(pointToString(current))! + map[neighbor.y][neighbor.x];

      if (
        !cost.has(pointToString(neighbor)) ||
        newCost < cost.get(pointToString(neighbor))!
      ) {
        cost.set(pointToString(neighbor), newCost);
        const priority = newCost + manhattanDistance(end, neighbor);
        frontier.insert(neighbor, priority);
      }
    }
  }

  return cost.get(pointToString(end))!;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const res = find_cheapest_path(
    input,
    { x: 0, y: 0 },
    { x: input[0].length - 1, y: input.length - 1 },
  );

  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // This duplication is a bit ugly, but it works and I'm tired :D
  const withExpandedColumns: number[][] = new Array(input.length)
    .fill(false)
    .map(() => new Array(0));
  // Duplicate the columns and increment.
  for (let i = 0; i < 5; i++) {
    for (let row = 0; row < input.length; row++) {
      withExpandedColumns[row].push(
        ...input[row].map((x) => {
          if (x + i > 9) {
            return x + i - 9;
          } else {
            return x + i;
          }
        }),
      );
    }
  }
  const map: number[][] = [];
  // Duplicate the rows and increment.
  for (let i = 0; i < 5; i++) {
    map.push(
      ...withExpandedColumns.map((row) => {
        return row.map((x) => {
          if (x + i > 9) {
            return x + i - 9;
          } else {
            return x + i;
          }
        });
      }),
    );
  }
  const res = find_cheapest_path(
    map,
    { x: 0, y: 0 },
    { x: map[0].length - 1, y: map.length - 1 },
  );
  return res;
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
