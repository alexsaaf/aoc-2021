import run from "aocrunner";
import { stringify } from "querystring";

const parseInput = (rawInput: string) => {
  return rawInput.split(/\r?\n/).map((row) => {
    const splitRow = row.split(" | ");

    const signalPatterns = splitRow[0].split(" ");
    const output = splitRow[1].split(" ");

    return { signalPatterns, output };
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, row) => {
    return (
      acc +
      row.output.reduce(
        (acc, val) => ([2, 4, 3, 7].includes(val.length) ? acc + 1 : acc),
        0,
      )
    );
  }, 0);
};

const patternsWithLength = (patterns: string[], length: number): string[] =>
  patterns.filter((pattern) => pattern.length === length)!;

const diffBetweenPatterns = (a: string, b: string): number => {
  const aChars = a.split("");
  const bChars = b.split("");

  return aChars
    .filter((x) => !bChars.includes(x))
    .concat(bChars.filter((x) => !aChars.includes(x))).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let count = 0;
  input.forEach((row) => {
    const digitRes: string[] = new Array(10).fill("");
    let patterns = row.signalPatterns;

    // Set the simple ones.
    digitRes[1] = patternsWithLength(patterns, 2)[0];
    digitRes[7] = patternsWithLength(patterns, 3)[0];
    digitRes[4] = patternsWithLength(patterns, 4)[0];
    digitRes[8] = patternsWithLength(patterns, 7)[0];

    // Remove found patterns.
    patterns = patterns.filter((pattern) => !digitRes.includes(pattern));

    let ofLengthSix = patternsWithLength(patterns, 6);
    const nine = ofLengthSix.find(
      (pattern) => diffBetweenPatterns(pattern, digitRes[4]) === 2,
    );
    digitRes[9] = nine!;

    const zero = ofLengthSix.find(
      (pattern) =>
        diffBetweenPatterns(pattern, digitRes[7]) === 3 && pattern !== nine,
    );
    digitRes[0] = zero!;

    const six = ofLengthSix.filter(
      (pattern) => pattern !== nine && pattern != zero,
    )[0];
    digitRes[6] = six;

    patterns = patterns.filter(
      (pattern) => ![digitRes[9], digitRes[0], digitRes[6]].includes(pattern),
    );

    const five = patterns.find(
      (pattern) => diffBetweenPatterns(pattern, digitRes[6]) === 1,
    );
    digitRes[5] = five!;

    const three = patterns.find(
      (pattern) =>
        diffBetweenPatterns(pattern, digitRes[9]) === 1 && pattern !== five,
    );
    digitRes[3] = three!;

    const two = patterns.filter(
      (pattern) => ![digitRes[5], digitRes[3]].includes(pattern),
    )[0];
    digitRes[2] = two;

    const value = parseInt(
      row.output
        .map((val) =>
          digitRes.findIndex(
            (pattern) => diffBetweenPatterns(val, pattern) === 0,
          ),
        )
        .join(""),
    );
    count += value;
  });

  return count;
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
