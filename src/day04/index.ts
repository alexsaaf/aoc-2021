import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const components = rawInput.split(/\n\s*\n/);
  const drawnNumbers = components[0].split(",").map((val) => parseInt(val));

  const boards = components.splice(1).map((inputBoard) => {
    let board: number[][] = [];
    const rows = inputBoard.split(/\r?\n/);
    rows.forEach((val, idx) => {
      const newRow = val
        .split(" ")
        .filter((val) => !!val)
        .map((stringValue) => {
          return parseInt(stringValue);
        });
      board.push(newRow);
    });
    return board;
  });
  return { boards, drawnNumbers };
};

const getColumns = (board: number[][]): number[][] => {
  const columns: number[][] = [];
  for (let i = 0; i < board[0].length; i++) {
    columns.push(board.map((row) => row[i]));
  }
  return columns;
};

const checkBoard = (board: number[][], drawnNumbers: number[]): boolean => {
  const rowsBingo = board.some((row) =>
    row.every((val) => drawnNumbers.includes(val)),
  );
  const colBingo = getColumns(board).some((col) =>
    col.every((val) => drawnNumbers.includes(val)),
  );
  return rowsBingo || colBingo;
};

const countBoard = (board: number[][], drawnNumbers: number[]): number => {
  const res = board.reduce(
    (outerAcc, row) =>
      outerAcc +
      row.reduce((acc, val) => {
        return drawnNumbers.includes(val) ? acc : acc + val;
      }, 0),
    0,
  );
  return res;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const drawnNumbers: number[] = [];
  let res: number | undefined = undefined;
  for (let number of input.drawnNumbers) {
    drawnNumbers.push(number);
    const bingoBoard = input.boards.find((board) => {
      return checkBoard(board, drawnNumbers);
    });
    if (bingoBoard) {
      res = countBoard(bingoBoard, drawnNumbers) * number;
      break;
    }
  }
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let boards = input.boards;
  const drawnNumbers: number[] = [];
  let res: number | undefined = undefined;
  for (let number of input.drawnNumbers) {
    drawnNumbers.push(number);

    if (boards.length === 1 && checkBoard(boards[0], drawnNumbers)) {
      res = countBoard(boards[0], drawnNumbers) * number;
      break;
    }

    boards = boards.filter((board) => !checkBoard(board, drawnNumbers));
  }
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
