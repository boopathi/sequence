import {
  Board,
  BoardState,
  CompletionPath,
  getColChunks,
  getDiag0Chunks,
  getDiag1Chunks,
  getRowChunks,
} from "$lib/game";
import { describe, expect, test } from "vitest";

describe("completion", () => {
  test("check row", () => {
    const board = new Board();
    board.place([4, 5], BoardState.GREEN_CHIP);
    board.place([4, 6], BoardState.GREEN_CHIP);
    board.place([4, 7], BoardState.GREEN_CHIP);
    board.place([4, 8], BoardState.GREEN_CHIP);
    board.place([4, 9], BoardState.GREEN_CHIP);

    const rowChunks = getRowChunks([4, 8]);
    const completed = board.getCompletion(rowChunks, CompletionPath.ROW);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            4,
            5,
          ],
          [
            4,
            6,
          ],
          [
            4,
            7,
          ],
          [
            4,
            8,
          ],
          [
            4,
            9,
          ],
        ],
        "path": "ROW",
        "state": 103,
      }
    `);
  });

  test("check column", () => {
    const board = new Board();
    board.place([5, 4], BoardState.GREEN_CHIP);
    board.place([6, 4], BoardState.GREEN_CHIP);
    board.place([7, 4], BoardState.GREEN_CHIP);
    board.place([8, 4], BoardState.GREEN_CHIP);
    board.place([9, 4], BoardState.GREEN_CHIP);

    const colChunks = getColChunks([6, 4]);
    const completed = board.getCompletion(colChunks, CompletionPath.COL);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            5,
            4,
          ],
          [
            6,
            4,
          ],
          [
            7,
            4,
          ],
          [
            8,
            4,
          ],
          [
            9,
            4,
          ],
        ],
        "path": "COL",
        "state": 103,
      }
    `);
  });

  test("check row with corner", () => {
    const board = new Board();
    board.place([0, 1], BoardState.GREEN_CHIP);
    board.place([0, 2], BoardState.GREEN_CHIP);
    board.place([0, 3], BoardState.GREEN_CHIP);
    board.place([0, 4], BoardState.GREEN_CHIP);

    const rowChunks = getRowChunks([0, 3]);
    const completed = board.getCompletion(rowChunks, CompletionPath.ROW);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            0,
            0,
          ],
          [
            0,
            1,
          ],
          [
            0,
            2,
          ],
          [
            0,
            3,
          ],
          [
            0,
            4,
          ],
        ],
        "path": "ROW",
        "state": 103,
      }
    `);
  });

  test("check column with corner", () => {
    const board = new Board();
    board.place([1, 0], BoardState.GREEN_CHIP);
    board.place([2, 0], BoardState.GREEN_CHIP);
    board.place([3, 0], BoardState.GREEN_CHIP);
    board.place([4, 0], BoardState.GREEN_CHIP);

    const colChunks = getColChunks([3, 0]);
    const completed = board.getCompletion(colChunks, CompletionPath.COL);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            0,
            0,
          ],
          [
            1,
            0,
          ],
          [
            2,
            0,
          ],
          [
            3,
            0,
          ],
          [
            4,
            0,
          ],
        ],
        "path": "COL",
        "state": 103,
      }
    `);
  });

  test("check diag0 with corner", () => {
    const board = new Board();
    board.place([1, 1], BoardState.GREEN_CHIP);
    board.place([2, 2], BoardState.GREEN_CHIP);
    board.place([3, 3], BoardState.GREEN_CHIP);
    board.place([4, 4], BoardState.GREEN_CHIP);

    const diagChunks = getDiag0Chunks([2, 2]);
    const completed = board.getCompletion(diagChunks, CompletionPath.DIAG_0);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            0,
            0,
          ],
          [
            1,
            1,
          ],
          [
            2,
            2,
          ],
          [
            3,
            3,
          ],
          [
            4,
            4,
          ],
        ],
        "path": "DIAG_0",
        "state": 103,
      }
    `);
  });

  test("check diag0 without corner", () => {
    const board = new Board();
    board.place([5, 1], BoardState.GREEN_CHIP);
    board.place([6, 2], BoardState.GREEN_CHIP);
    board.place([7, 3], BoardState.GREEN_CHIP);
    board.place([8, 4], BoardState.GREEN_CHIP);
    board.place([9, 5], BoardState.GREEN_CHIP);

    const diagChunks = getDiag0Chunks([5, 1]);
    const completed = board.getCompletion(diagChunks, CompletionPath.DIAG_0);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            5,
            1,
          ],
          [
            6,
            2,
          ],
          [
            7,
            3,
          ],
          [
            8,
            4,
          ],
          [
            9,
            5,
          ],
        ],
        "path": "DIAG_0",
        "state": 103,
      }
    `);
  });

  test("check diag1 with corner", () => {
    const board = new Board();
    board.place([1, 8], BoardState.GREEN_CHIP);
    board.place([2, 7], BoardState.GREEN_CHIP);
    board.place([3, 6], BoardState.GREEN_CHIP);
    board.place([4, 5], BoardState.GREEN_CHIP);

    const diagChunks = getDiag1Chunks([2, 7]);
    const completed = board.getCompletion(diagChunks, CompletionPath.DIAG_1);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            0,
            9,
          ],
          [
            1,
            8,
          ],
          [
            2,
            7,
          ],
          [
            3,
            6,
          ],
          [
            4,
            5,
          ],
        ],
        "path": "DIAG_1",
        "state": 103,
      }
    `);
  });

  test("check diag1 without corner", () => {
    const board = new Board();
    board.place([5, 9], BoardState.GREEN_CHIP);
    board.place([6, 8], BoardState.GREEN_CHIP);
    board.place([7, 7], BoardState.GREEN_CHIP);
    board.place([8, 6], BoardState.GREEN_CHIP);
    board.place([9, 5], BoardState.GREEN_CHIP);

    const diagChunks = getDiag1Chunks([5, 9]);

    const completed = board.getCompletion(diagChunks, CompletionPath.DIAG_1);
    expect(completed).toMatchInlineSnapshot(`
      {
        "locs": [
          [
            5,
            9,
          ],
          [
            6,
            8,
          ],
          [
            7,
            7,
          ],
          [
            8,
            6,
          ],
          [
            9,
            5,
          ],
        ],
        "path": "DIAG_1",
        "state": 103,
      }
    `);
  });
});
