import run from "aocrunner";

type Squid = {
  energy: number;
  flashedAt: number;
};

const parseInput = (rawInput: string): Squid[][] => {
  return rawInput.split(/\r?\n/).map((row) =>
    row
      .split("")
      .map((energy) => parseInt(energy))
      .map((energy) => ({ energy, flashedAt: -1 })),
  );
};

const findNeighbors = (
  row: number,
  column: number,
  population: Squid[][],
): Squid[] => {
  const neighbors: Squid[] = [];
  const minRow = row > 0 ? row - 1 : 0;
  const maxRow = row < population.length - 1 ? row + 1 : population.length - 1;

  const minCol = column > 0 ? column - 1 : 0;
  const maxCol =
    column < population[0].length - 1 ? column + 1 : population[0].length - 1;

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      neighbors.push(population[row][col]);
    }
  }

  return neighbors;
};

const incrementEnergy = (population: Squid[][]) => {
  population.forEach((row) => row.forEach((squid) => (squid.energy += 1)));
};

const handleFlashes = (population: Squid[][], step: number) => {
  let hadFlash = true;

  while (hadFlash) {
    hadFlash = false;

    population.forEach((row, rowIdx) =>
      row.forEach((squid, colIdx) => {
        // If we have enough energy, and we haven't flashed this step
        if (squid.energy > 9 && squid.flashedAt !== step) {
          hadFlash = true;
          squid.flashedAt = step;
          findNeighbors(rowIdx, colIdx, population).forEach((neighbor) => {
            neighbor.energy += 1;
          });
        }
      }),
    );
  }
};

const countFlashes = (population: Squid[][], step: number) => {
  return population.reduce((acc, row) => {
    return (
      acc +
      row.reduce((acc, squid) => {
        return squid.flashedAt === step ? acc + 1 : acc;
      }, 0)
    );
  }, 0);
};

const resetFlashed = (population: Squid[][], step: number) => {
  population.forEach((row) =>
    row.forEach((squid) => {
      if (squid.flashedAt === step) {
        squid.energy = 0;
      }
    }),
  );
};

const part1 = (rawInput: string) => {
  let population = parseInput(rawInput);

  let totalFlashes = 0;

  for (let i = 0; i < 100; i++) {
    incrementEnergy(population);
    handleFlashes(population, i);
    totalFlashes += countFlashes(population, i);
    resetFlashed(population, i);
  }

  return totalFlashes;
};

const part2 = (rawInput: string) => {
  let population = parseInput(rawInput);

  for (let i = 0; i < 3000; i++) {
    incrementEnergy(population);
    handleFlashes(population, i);
    if (countFlashes(population, i) === 100) {
      return i + 1;
    }
    resetFlashed(population, i);
  }

  return 0;
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
