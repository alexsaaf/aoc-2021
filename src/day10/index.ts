import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);

const syntaxErrorScore = [3, 57, 1197, 25137];
const opening = ["(", "[", "{", "<"];
const closing = [")", "]", "}", ">"];

const getSyntaxErrorScore = (row: string): number => {
  const characters = row.split("");

  const openedChunks: string[] = [];

  for (let character of characters) {
    if (opening.includes(character)) {
      openedChunks.push(character);
    } else if (closing.includes(character)) {
      const lastOpened = openedChunks.pop();
      const lastOpenedIdx = opening.findIndex(
        (opener) => opener === lastOpened,
      );
      const newIdx = closing.findIndex((closer) => closer === character);
      if (lastOpenedIdx !== newIdx) {
        return syntaxErrorScore[newIdx];
      }
    }
  }

  return 0;
};

const findUnclosedChunks = (row: string): string[] => {
  const characters = row.split("");

  const openedChunks: string[] = [];

  for (let character of characters) {
    if (opening.includes(character)) {
      openedChunks.push(character);
    } else if (closing.includes(character)) {
      const lastOpened = openedChunks.pop();
    }
  }

  return openedChunks;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, row) => {
    return acc + getSyntaxErrorScore(row);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const incomplete = input.filter((row) => getSyntaxErrorScore(row) === 0);

  const scores: number[] = [];

  incomplete.forEach((row) => {
    const unClosed = findUnclosedChunks(row);

    let rowScore = 0;
    unClosed.reverse().forEach((opener) => {
      rowScore *= 5;
      rowScore += opening.findIndex((val) => val === opener) + 1;
    });

    scores.push(rowScore);
  });
  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2];
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
