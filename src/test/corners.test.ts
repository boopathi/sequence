import { Board, BoardState, Game } from "$lib/game";
import chalk from "chalk";
import { describe, expect, test } from "vitest";

describe("corners", () => {
  test("prefer corners 0,0", () => {
    const game = new Game("1vs1");
    game.playTurn([0, 1]);
    game.playTurn([1, 0]);
    game.playTurn([0, 2]);
    game.playTurn([2, 0]);
    game.playTurn([0, 3]);
    game.playTurn([3, 1]);
    game.playTurn([0, 5]);
    game.playTurn([6, 1]);
    game.playTurn([0, 6]);
    game.playTurn([4, 1]);
    game.playTurn([0, 4]);

    expect(game.status.completed[0].locs).toMatchInlineSnapshot(`
      [
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
      ]
    `);
  });
});
