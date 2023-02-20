import { describe, expect, test } from "vitest";
import { Board, BoardState, CompletionPath, Game } from "$lib/game";
import { boardConfig } from "$lib/board-config";
import chalk from "chalk";

// prettier-ignore
const suits = ["S", "C", "D", "H"];
// prettier-ignore
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "K", "A"];

describe("board", () => {
  test("place on an empty space", () => {
    const b = new Board();
    b.place([0, 1], BoardState.BLUE_CHIP);
    expect(b.get([0, 1])).toBe(BoardState.BLUE_CHIP);
  });

  test("place the same chip on an occupied space", () => {
    const b = new Board();
    b.place([0, 2], BoardState.BLUE_CHIP);
    expect(() =>
      b.place([0, 2], BoardState.BLUE_CHIP),
    ).toThrowErrorMatchingInlineSnapshot(
      '"ERR_CHIP_EXISTS: Cannot play the card \\"S3\\". Card already exists"',
    );
  });

  test("place a different chip on an occupied space", () => {
    const b = new Board();
    b.place([0, 2], BoardState.BLUE_CHIP);
    expect(() =>
      b.place([0, 2], BoardState.GREEN_CHIP),
    ).toThrowErrorMatchingInlineSnapshot(
      '"ERR_CHIP_EXISTS: Cannot play the card \\"S3\\". Card already exists"',
    );
  });

  test("place a chip in the corner", () => {
    const b = new Board();
    expect(() =>
      b.place([0, 0], BoardState.BLUE_CHIP),
    ).toThrowErrorMatchingInlineSnapshot(
      '"ERR_CORNER_CHIP: Cannot play CORNER location"',
    );
    expect(() =>
      b.place([0, boardConfig.rows.length - 1], BoardState.BLUE_CHIP),
    ).toThrowErrorMatchingInlineSnapshot(
      '"ERR_CORNER_CHIP: Cannot play CORNER location"',
    );
  });
});

describe("game", () => {
  test("regression: 3 player remove and undo", () => {
    const game = new Game("1vs1vs1");
    game.playTurn([1, 1]);
    game.playTurn([1, 2]);
    game.playTurn([1, 3]);
    game.playTurn([2, 1]);
    game.playTurn([2, 2]);
    game.playTurn([2, 3]);
    game.playTurn([3, 1]);
    game.playTurn([3, 2]);
    game.playTurn([3, 3]);
    const prevRows = structuredClone(game.board.rows);
    game.remove([3, 3]);
    game.undo();
    const newRows = structuredClone(game.board.rows);
    expect(newRows).toEqual(prevRows);
  });
});

describe("chunking", () => {
  test("check diagonal_0 with corner", () => {
    const board = new Board();
    board.place([1, 1], BoardState.RED_CHIP);
    board.place([2, 2], BoardState.RED_CHIP);
    board.place([3, 3], BoardState.RED_CHIP);
    board.place([4, 4], BoardState.RED_CHIP);
    expect(board.check2([4, 4]).completed[0]).toMatchObject({
      state: BoardState.RED_CHIP,
      path: CompletionPath.DIAG_0,
      locs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
    });
  });

  test("check diagonal_0 without corner", () => {
    const board = new Board();
    board.place([3, 1], BoardState.RED_CHIP);
    board.place([4, 2], BoardState.RED_CHIP);
    board.place([5, 3], BoardState.RED_CHIP);
    board.place([6, 4], BoardState.RED_CHIP);
    board.place([7, 5], BoardState.RED_CHIP);
    expect(board.check2([6, 4]).completed[0]).toMatchObject({
      state: BoardState.RED_CHIP,
      path: CompletionPath.DIAG_0,
      locs: [
        [3, 1],
        [4, 2],
        [5, 3],
        [6, 4],
        [7, 5],
      ],
    });
  });

  test("check diagonal_1 with corner", () => {
    const board = new Board();
    board.place([1, 8], BoardState.BLUE_CHIP);
    board.place([2, 7], BoardState.BLUE_CHIP);
    board.place([3, 6], BoardState.BLUE_CHIP);
    board.place([4, 5], BoardState.BLUE_CHIP);
    const status = board.check2([1, 8]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.BLUE_CHIP,
      path: CompletionPath.DIAG_1,
      locs: [
        [0, 9],
        [1, 8],
        [2, 7],
        [3, 6],
        [4, 5],
      ],
    });
  });

  test("check diagonal_1 without corner", () => {
    const board = new Board();
    board.place([0, 7], BoardState.BLUE_CHIP);
    board.place([1, 6], BoardState.BLUE_CHIP);
    board.place([2, 5], BoardState.BLUE_CHIP);
    board.place([3, 4], BoardState.BLUE_CHIP);
    board.place([4, 3], BoardState.BLUE_CHIP);
    const status = board.check2([2, 5]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.BLUE_CHIP,
      path: CompletionPath.DIAG_1,
      locs: [
        [0, 7],
        [1, 6],
        [2, 5],
        [3, 4],
        [4, 3],
      ],
    });
  });

  test("check row with corner", () => {
    const board = new Board();
    board.place([0, 1], BoardState.GREEN_CHIP);
    board.place([0, 2], BoardState.GREEN_CHIP);
    board.place([0, 3], BoardState.GREEN_CHIP);
    board.place([0, 4], BoardState.GREEN_CHIP);
    const status = board.check2([0, 1]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.GREEN_CHIP,
      path: CompletionPath.ROW,
      locs: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
    });
  });

  test("check row without corner", () => {
    const board = new Board();
    board.place([4, 5], BoardState.GREEN_CHIP);
    board.place([4, 6], BoardState.GREEN_CHIP);
    board.place([4, 7], BoardState.GREEN_CHIP);
    board.place([4, 8], BoardState.GREEN_CHIP);
    board.place([4, 9], BoardState.GREEN_CHIP);
    const status = board.check2([4, 6]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.GREEN_CHIP,
      path: CompletionPath.ROW,
      locs: [
        [4, 5],
        [4, 6],
        [4, 7],
        [4, 8],
        [4, 9],
      ],
    });
  });

  test("check column with corner", () => {
    const board = new Board();
    board.place([1, 0], BoardState.GREEN_CHIP);
    board.place([2, 0], BoardState.GREEN_CHIP);
    board.place([3, 0], BoardState.GREEN_CHIP);
    board.place([4, 0], BoardState.GREEN_CHIP);
    const status = board.check2([4, 0]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.GREEN_CHIP,
      path: CompletionPath.COL,
      locs: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ],
    });
  });

  test("check column without corner", () => {
    const board = new Board();
    board.place([5, 4], BoardState.GREEN_CHIP);
    board.place([6, 4], BoardState.GREEN_CHIP);
    board.place([7, 4], BoardState.GREEN_CHIP);
    board.place([8, 4], BoardState.GREEN_CHIP);
    board.place([9, 4], BoardState.GREEN_CHIP);
    const status = board.check2([9, 4]);
    expect(status.completed[0]).toMatchObject({
      state: BoardState.GREEN_CHIP,
      path: CompletionPath.COL,
      locs: [
        [5, 4],
        [6, 4],
        [7, 4],
        [8, 4],
        [9, 4],
      ],
    });
  });
});

describe("check completion overlaps", () => {
  test("check column without corner", () => {
    const board = new Board();
    board.place([4, 4], BoardState.GREEN_CHIP);
    board.place([5, 4], BoardState.GREEN_CHIP);
    board.place([6, 4], BoardState.GREEN_CHIP);
    board.place([7, 4], BoardState.GREEN_CHIP);
    board.place([8, 4], BoardState.GREEN_CHIP);
    board.place([9, 4], BoardState.GREEN_CHIP);
    const status = board.check2([6, 4]);
    expect(status.completed.length).toBe(1);
  });
});
