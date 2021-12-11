import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split(/\r?\n/)
    .map((row) => row.split("").map((height) => parseInt(height)));
};

const findNeighbors = (
  row: number,
  column: number,
  map: number[][],
): number[] => {
  const neighbors: number[] = [];
  if (row > 0) {
    neighbors.push(map[row - 1][column]);
  }
  if (row < map.length - 1) {
    neighbors.push(map[row + 1][column]);
  }
  if (column > 0) {
    neighbors.push(map[row][column - 1]);
  }
  if (column < map[0].length - 1) {
    neighbors.push(map[row][column + 1]);
  }
  return neighbors;
};

type Point = {
  row: number;
  column: number;
};

const findNeighborPositions = (
  row: number,
  column: number,
  map: number[][],
): Point[] => {
  const neighbors: Point[] = [];
  if (row > 0 && map[row - 1][column] !== 9) {
    neighbors.push({ row: row - 1, column });
  }
  if (row < map.length - 1 && map[row + 1][column] !== 9) {
    neighbors.push({ row: row + 1, column });
  }
  if (column > 0 && map[row][column - 1] !== 9) {
    neighbors.push({ row, column: column - 1 });
  }
  if (column < map[0].length - 1 && map[row][column + 1] !== 9) {
    neighbors.push({ row, column: column + 1 });
  }
  return neighbors;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let totalRisk = 0;

  input.forEach((row, rowIdx) => {
    row.forEach((height, colIdx) => {
      const neighbors = findNeighbors(rowIdx, colIdx, input);
      if (neighbors.every((neighbor) => neighbor > height)) {
        totalRisk += 1 + height;
      }
    });
  });
  return totalRisk;
};

const countBasin = (row: number, column: number, map: number[][]): number => {
  // Add the sink.
  const positionsInBasin = [{ row, column }];

  const candidates = findNeighborPositions(row, column, map);
  while (candidates.length !== 0) {
    const next = candidates.shift()!;
    positionsInBasin.push(next);
    const neighbors = findNeighborPositions(next.row, next.column, map).filter(
      (neighbor) => {
        return (
          positionsInBasin.find(
            (position) =>
              position.row === neighbor.row &&
              position.column === neighbor.column,
          ) === undefined &&
          candidates.find(
            (position) =>
              position.row === neighbor.row &&
              position.column === neighbor.column,
          ) === undefined
        );
      },
    );
    candidates.push(...neighbors);
  }

  return positionsInBasin.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const basins: number[] = [];

  input.forEach((row, rowIdx) => {
    row.forEach((height, colIdx) => {
      const neighbors = findNeighbors(rowIdx, colIdx, input);
      if (neighbors.every((neighbor) => neighbor > height)) {
        // Found sink!
        basins.push(countBasin(rowIdx, colIdx, input));
      }
    });
  });

  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
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
