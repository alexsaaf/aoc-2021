import run from "aocrunner";

const hexToBinary: Record<string, string> = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const parseInput = (rawInput: string) => {
  return rawInput.split("").reduce((acc: string, curr: string) => {
    return acc + hexToBinary[curr];
  }, "");
};

const readPacket = (input: string, startBit: number): [number, number] => {
  let i = startBit;
  const packetVersion = parseInt(input.substr(i, 3), 2);
  const packetType = parseInt(input.substr(i + 3, 3), 2);

  let totalVersion = packetVersion;
  i += 6;

  if (packetType === 4) {
    // Literal value, read the groups.
    while (true) {
      i += 5;
      if (input[i - 5] === "0") break;
    }

    return [packetVersion, i];
  } else {
    if (input[i] === "0") {
      // i + 1 (lengthbit) + 15 (length value bits) + actual length
      const stopAt = i + 16 + parseInt(input.substr(i + 1, 15), 2);
      i += 16;

      while (i < stopAt) {
        const [versionCount, newIndex] = readPacket(input, i);
        i = newIndex;
        totalVersion += versionCount;
      }
    } else {
      const packagesToRead = parseInt(input.substr(i + 1, 11), 2);
      i += 12;
      [...Array(packagesToRead)].forEach(() => {
        const [versionCount, newIndex] = readPacket(input, i);
        i = newIndex;
        totalVersion += versionCount;
      });
    }
    return [totalVersion, i];
  }
};

const applyOperator = (values: number[], operator: number): number => {
  switch (operator) {
    case 0:
      return values.reduce((acc, curr) => acc + curr, 0);
    case 1:
      return values.reduce((acc, curr) => acc * curr, 1);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] === values[1] ? 1 : 0;
  }
  return 0;
};

const readPacketWithOperations = (
  input: string,
  startBit: number,
): [number, number] => {
  let i = startBit;
  const packetVersion = parseInt(input.substr(i, 3), 2);
  const packetType = parseInt(input.substr(i + 3, 3), 2);

  let totalVersion = packetVersion;
  i += 6;
  if (packetType === 4) {
    // Literal value, read the groups.
    let val = "";
    while (true) {
      val += input.substr(i + 1, 4);
      i += 5;
      if (input[i - 5] === "0") break;
    }
    const padded = val.padStart(16, "");
    return [parseInt(padded, 2), i];
  } else {
    let vals: number[] = [];
    if (input[i] === "0") {
      // i + 1 (lengthbit) + 15 (length value bits) + actual length
      const stopAt = i + 16 + parseInt(input.substr(i + 1, 15), 2);
      i += 16;

      while (i < stopAt) {
        const [val, newIndex] = readPacketWithOperations(input, i);
        i = newIndex;
        vals.push(val);
      }
    } else {
      const packagesToRead = parseInt(input.substr(i + 1, 11), 2);
      i += 12;
      [...Array(packagesToRead)].forEach(() => {
        const [val, newIndex] = readPacketWithOperations(input, i);
        i = newIndex;
        vals.push(val);
      });
    }
    return [applyOperator(vals, packetType), i];
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return readPacket(input, 0)[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return readPacketWithOperations(input, 0)[0];
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
