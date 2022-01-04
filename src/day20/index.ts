import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const [enhancementAlgorithm, rawImage] = rawInput
    // Split on new line
    .split("\n\n");
  const image = rawImage.split(/\r?\n/).map((row) => row.split(""));
  return {
    enhancementAlgorithm,
    image,
  };
};

const getNeighborsBinary = (
  image: string[][],
  posX: number,
  posY: number,
  iterationNumber: number,
): string => {
  let res = "";
  for (let y = posY - 1; y <= posY + 1; y++) {
    // Check if above / below image
    if (y < 0 || y >= image.length) {
      res += iterationNumber % 2 === 1 ? "111" : "000";
      continue;
    }
    for (let x = posX - 1; x <= posX + 1; x++) {
      if (x < 0 || x >= image[0].length) {
        res += iterationNumber % 2 === 1 ? "1" : "0";
      } else {
        res += image[y][x] === "#" ? "1" : "0";
      }
    }
  }
  return res;
};

const enhanceImage = (
  image: string[][],
  enchangementAlgorithm: string,
  iterationNumber: number,
): string[][] => {
  const targetWidth = image[0].length + 2;
  const targetHeight = image.length + 2;

  const enhancedImage: string[][] = new Array(targetHeight)
    .fill("")
    .map(() => new Array(targetWidth).fill(""));

  for (let y = -1; y < targetHeight - 1; y++) {
    for (let x = -1; x < targetWidth - 1; x++) {
      const binary = getNeighborsBinary(image, x, y, iterationNumber);
      const positionInEnhanced = parseInt(binary, 2);
      enhancedImage[y + 1][x + 1] = enchangementAlgorithm[positionInEnhanced];
    }
  }
  return enhancedImage;
};

const countLights = (image: string[][]): number => {
  return image.reduce(
    (acc, row) =>
      acc +
      row.reduce((acc, character) => (character === "#" ? acc + 1 : acc), 0),
    0,
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const finalImage = enhanceImage(
    enhanceImage(input.image, input.enhancementAlgorithm, 0),
    input.enhancementAlgorithm,
    1,
  );
  return countLights(finalImage);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let image = input.image;
  for (let i = 0; i < 50; i++) {
    image = enhanceImage(image, input.enhancementAlgorithm, i);
  }

  return countLights(image);
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
