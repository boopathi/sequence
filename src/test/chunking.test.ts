import type { Location } from "$lib/board-config";
import {
  getColumnChunks,
  getDiagonal1Chunks,
  getDiagonal2Chunks,
  getRowChunks,
} from "$lib/game";
import { describe, expect, test } from "vitest";

describe("chunking", () => {
  describe("rows", () => {
    test("5,1", () => {
      expect(printChunks(getRowChunks([5, 1]))).toMatchInlineSnapshot(`
        "5,0 5,1 5,2 5,3 5,4
        5,1 5,2 5,3 5,4 5,5"
      `);
    });

    test("1,1", () => {
      expect(printChunks(getRowChunks([1, 1]))).toMatchInlineSnapshot(`
        "1,0 1,1 1,2 1,3 1,4
        1,1 1,2 1,3 1,4 1,5"
      `);
    });

    test("1,9", () => {
      expect(printChunks(getRowChunks([1, 9]))).toMatchInlineSnapshot(
        '"1,5 1,6 1,7 1,8 1,9"',
      );
    });
  });

  describe("columns", () => {
    test("5,1", () => {
      expect(printChunks(getColumnChunks([5, 1]))).toMatchInlineSnapshot(`
        "1,1 2,1 3,1 4,1 5,1
        2,1 3,1 4,1 5,1 6,1
        3,1 4,1 5,1 6,1 7,1
        4,1 5,1 6,1 7,1 8,1
        5,1 6,1 7,1 8,1 9,1"
      `);
    });

    test("1,1", () => {
      expect(printChunks(getColumnChunks([1, 1]))).toMatchInlineSnapshot(`
        "0,1 1,1 2,1 3,1 4,1
        1,1 2,1 3,1 4,1 5,1"
      `);
    });

    test("1,9", () => {
      expect(printChunks(getColumnChunks([1, 9]))).toMatchInlineSnapshot(`
        "0,9 1,9 2,9 3,9 4,9
        1,9 2,9 3,9 4,9 5,9"
      `);
    });
  });

  describe("diagonal 1", () => {
    test("1,1", () => {
      expect(printChunks(getDiagonal1Chunks([1, 1]))).toMatchInlineSnapshot(`
        "0,0 1,1 2,2 3,3 4,4
        1,1 2,2 3,3 4,4 5,5"
      `);
    });

    test("5,1", () => {
      expect(printChunks(getDiagonal1Chunks([5, 1]))).toMatchInlineSnapshot(`
        "4,0 5,1 6,2 7,3 8,4
        5,1 6,2 7,3 8,4 9,5"
      `);
    });
  });

  describe("diagonal 2", () => {
    test("1,1", () => {
      expect(printChunks(getDiagonal2Chunks([1, 1]))).toMatchInlineSnapshot(
        '""',
      );
    });

    test("5,1", () => {
      expect(printChunks(getDiagonal2Chunks([5, 1]))).toMatchInlineSnapshot(
        '"1,5 2,4 3,3 4,2 5,1"',
      );
    });
  });
});

function printChunks(chunks: Location[][]) {
  return chunks
    .map((chunk) => chunk.map((location) => location.join(",")).join(" "))
    .join("\n");
}
