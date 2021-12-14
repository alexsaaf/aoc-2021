import run from "aocrunner";
import { isError } from "util";

const parseInput = (rawInput: string) => {
  const [startString, insertionsInput] = rawInput
    // Split on new line
    .split("\n\n");

  const insertionRules = new Map<string, string>();
  insertionsInput.split(/\r?\n/).forEach((insertion) => {
    const [from, add] = insertion.split(" -> ");
    insertionRules.set(from, add);
  });

  return {
    startString,
    insertionRules,
  };
};

const insertPolymers = (
  polymer: string,
  insertionRules: Map<string, string>,
): string => {
  let res = "";
  for (let i = 0; i < polymer.length - 1; i++) {
    res += polymer[i];
    if (insertionRules.has(`${polymer[i]}${polymer[i + 1]}`)) {
      res += insertionRules.get(`${polymer[i]}${polymer[i + 1]}`);
    }
  }
  res += polymer[polymer.length - 1];
  return res;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let res = input.startString;

  for (let i = 0; i < 10; i++) {
    res = insertPolymers(res, input.insertionRules);
  }

  const occurances = new Map<string, number>();
  res.split("").forEach((character) => {
    if (!occurances.has(character)) {
      occurances.set(character, 1);
    } else {
      occurances.set(character, occurances.get(character)! + 1);
    }
  });
  const sortedOccurances = [...occurances.values()].sort((a, b) => a - b);
  return sortedOccurances[sortedOccurances.length - 1] - sortedOccurances[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let polymer = input.startString;

  // Keep track of how many pairs we have.
  let pairs = new Map<string, number>();

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = `${polymer[i]}${polymer[i + 1]}`;
    if (pairs.has(pair)) {
      pairs.set(pair, pairs.get(pair)! + 1);
    } else {
      pairs.set(pair, 1);
    }
  }

  const alphabet = Array.from(Array(26))
    .map((e, i) => i + 65)
    .map((x) => String.fromCharCode(x));

  const letterOccurances = new Map<string, number>(
    alphabet.map((character) => [character, 0]),
  );

  polymer.split("").forEach((character) => {
    letterOccurances.set(character, letterOccurances.get(character)! + 1);
  });

  for (let i = 0; i < 40; i++) {
    const nextPairs = new Map<string, number>();
    for (let [pair, count] of pairs) {
      if (input.insertionRules.has(pair) && count > 0) {
        const newLetter = input.insertionRules.get(pair);

        // Increase the count of the new letter.
        letterOccurances.set(
          newLetter!,
          letterOccurances.get(newLetter!)! + count,
        );

        // Add the new pairs.
        const [first, second] = pair.split("");
        const firstNew = first + newLetter;
        const secondNew = newLetter + second;

        if (nextPairs.has(firstNew)) {
          nextPairs.set(firstNew, nextPairs.get(firstNew)! + count);
        } else {
          nextPairs.set(firstNew, count);
        }

        if (nextPairs.has(secondNew)) {
          nextPairs.set(secondNew, nextPairs.get(secondNew)! + count);
        } else {
          nextPairs.set(secondNew, count);
        }
      }
    }
    pairs = nextPairs;
  }

  const sortedOccurances = [...letterOccurances.values()]
    .filter((val) => val > 0)
    .sort((a, b) => a - b);
  return sortedOccurances[sortedOccurances.length - 1] - sortedOccurances[0];
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
