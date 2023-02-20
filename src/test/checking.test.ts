import { Board, BoardState, CompletionPath } from "$lib/game";
import chalk from "chalk";
import { describe, test, expect } from "vitest";

const DEBUG = true;

function log(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}

describe("checking", () => {
  test("check row", () => {
    const board = new Board();
    board.place([4, 5], BoardState.GREEN_CHIP);
    board.place([4, 6], BoardState.GREEN_CHIP);
    board.place([4, 7], BoardState.GREEN_CHIP);
    board.place([4, 8], BoardState.GREEN_CHIP);
    board.place([4, 9], BoardState.GREEN_CHIP);
    const result = board.check2([4, 6]);
    expect(result.completed).toStrictEqual([
      {
        state: BoardState.GREEN_CHIP,
        path: CompletionPath.ROW,
        locs: [
          [4, 5],
          [4, 6],
          [4, 7],
          [4, 8],
          [4, 9],
        ],
      },
    ]);
  });

  test("check column", () => {
    const board = new Board();
    board.place([1, 0], BoardState.GREEN_CHIP);
    board.place([2, 0], BoardState.GREEN_CHIP);
    board.place([3, 0], BoardState.GREEN_CHIP);
    board.place([4, 0], BoardState.GREEN_CHIP);

    const result = board.check2([3, 0]);
    expect(result.completed).toStrictEqual([
      {
        state: BoardState.GREEN_CHIP,
        path: CompletionPath.COL,
        locs: [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
        ],
      },
    ]);
  });

  test("check diagonal 0", () => {
    const board = new Board();
    board.place([1, 1], BoardState.GREEN_CHIP);
    board.place([2, 2], BoardState.GREEN_CHIP);
    board.place([3, 3], BoardState.GREEN_CHIP);
    board.place([4, 4], BoardState.GREEN_CHIP);

    const result = board.check2([2, 2]);
    expect(result.completed).toStrictEqual([
      {
        state: BoardState.GREEN_CHIP,
        path: CompletionPath.DIAG_0,
        locs: [
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ],
      },
    ]);
  });

  test("check diagonal 1", () => {
    const board = new Board();
    board.place([0, 7], BoardState.GREEN_CHIP);
    board.place([1, 6], BoardState.GREEN_CHIP);
    board.place([2, 5], BoardState.GREEN_CHIP);
    board.place([3, 4], BoardState.GREEN_CHIP);
    board.place([4, 3], BoardState.GREEN_CHIP);

    const result = board.check2([2, 5]);
    expect(result.completed).toStrictEqual([
      {
        state: BoardState.GREEN_CHIP,
        path: CompletionPath.DIAG_1,
        locs: [
          [0, 7],
          [1, 6],
          [2, 5],
          [3, 4],
          [4, 3],
        ],
      },
    ]);
  });
});
