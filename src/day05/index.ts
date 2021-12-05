import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split(/\r?\n/).map((row) => {
    const coordinates = row.split(" -> ");
    const startSplit = coordinates[0].split(",");
    const endSplit = coordinates[1].split(",");

    return {
      start: { x: parseInt(startSplit[0]), y: parseInt(startSplit[1]) },
      end: { x: parseInt(endSplit[0]), y: parseInt(endSplit[1]) },
    };
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findHotspots(input, false);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findHotspots(input, true);
};

// Use to get around map comparing objects, with no way to customize.
const getStringRepresentation = (point: { x: number; y: number }) => {
  return `x:${point.x}-y:${point.y}`;
};

const increment = (
  point: { x: number; y: number },
  map: Map<string, number>,
) => {
  const old = map.get(getStringRepresentation({ x: point.x, y: point.y }));
  if (old) {
    map.set(getStringRepresentation({ x: point.x, y: point.y }), old + 1);
  } else {
    map.set(getStringRepresentation({ x: point.x, y: point.y }), 1);
  }
};

const findHotspots = (
  input: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[],
  includeDiagonal: boolean,
): number => {
  const map = new Map<string, number>();
  input.forEach((line) => {
    if (line.start.x === line.end.x) {
      // Add a column
      const start = line.start.y < line.end.y ? line.start.y : line.end.y;
      const end = line.start.y > line.end.y ? line.start.y : line.end.y;
      for (let i = start; i <= end; i++) {
        increment({ x: line.start.x, y: i }, map);
      }
    } else if (line.start.y === line.end.y) {
      // Add a row
      const start = line.start.x < line.end.x ? line.start.x : line.end.x;
      const end = line.start.x > line.end.x ? line.start.x : line.end.x;
      for (let i = start; i <= end; i++) {
        increment({ x: i, y: line.start.y }, map);
      }
    } else if (includeDiagonal) {
      const start = line.start.x < line.end.x ? line.start : line.end;
      const end = line.start.x > line.end.x ? line.start : line.end;
      const yDirection = start.y > end.y ? -1 : 1;
      let y = start.y;
      for (let i = start.x; i <= end.x; i++) {
        increment({ x: i, y }, map);
        y += yDirection;
      }
    }
  });
  return [...map.values()].filter((value) => value > 1).length;
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
