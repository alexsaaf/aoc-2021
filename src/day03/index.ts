import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const bitValues: number[] = new Array(input[0].length).fill(0);

  input.forEach((binaryString) => {
    const characters = [...binaryString];
    characters.forEach((c, i) => {
      if (c === "1") {
        bitValues[i]++;
      } else {
        bitValues[i]--;
      }
    });
  });

  const gamma = parseInt(
    bitValues.map((val) => (val > 0 ? "1" : "0")).join(""),
    2,
  );
  const epsilon = parseInt(
    bitValues.map((val) => (val > 0 ? "0" : "1")).join(""),
    2,
  );
  const res = epsilon * gamma;
  return res;
};

const getCountForIndex = (input: string[], index: number): number => {
  let val = 0;
  input.forEach((binaryString) => {
    const characters = [...binaryString];
    const c = characters[index];
    if (c === "1") {
      val++;
    } else {
      val--;
    }
  });
  return val;
};

const getOgrRec = (remaining: string[], idx: number): string => {
  if (remaining.length === 1) {
    return remaining[0];
  }
  const count = getCountForIndex(remaining, idx);
  const filtered = remaining.filter(
    (val) =>
      (count >= 0 && val[idx] === "1") || (count < 0 && val[idx] === "0"),
  );

  return getOgrRec(filtered, idx + 1);
};

const getCsrRec = (remaining: string[], idx: number): string => {
  if (remaining.length === 1) {
    return remaining[0];
  }
  const count = getCountForIndex(remaining, idx);
  const filtered = remaining.filter(
    (val) =>
      (count >= 0 && val[idx] === "0") || (count < 0 && val[idx] === "1"),
  );

  return getCsrRec(filtered, idx + 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const ogr = getOgrRec(input, 0);
  const csr = getCsrRec(input, 0);

  return parseInt(ogr, 2) * parseInt(csr, 2);
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
