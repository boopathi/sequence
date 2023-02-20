import type { Location } from "$lib/board-config";
import {
  getColChunks,
  getDiag0Chunks,
  getDiag1Chunks,
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
      expect(printChunks(getColChunks([5, 1]))).toMatchInlineSnapshot(`
        "1,1 2,1 3,1 4,1 5,1
        2,1 3,1 4,1 5,1 6,1
        3,1 4,1 5,1 6,1 7,1
        4,1 5,1 6,1 7,1 8,1
        5,1 6,1 7,1 8,1 9,1"
      `);
    });

    test("1,1", () => {
      expect(printChunks(getColChunks([1, 1]))).toMatchInlineSnapshot(`
        "0,1 1,1 2,1 3,1 4,1
        1,1 2,1 3,1 4,1 5,1"
      `);
    });

    test("1,9", () => {
      expect(printChunks(getColChunks([1, 9]))).toMatchInlineSnapshot(`
        "0,9 1,9 2,9 3,9 4,9
        1,9 2,9 3,9 4,9 5,9"
      `);
    });
  });

  describe("diagonal 0", () => {
    test("1,1", () => {
      expect(printChunks(getDiag0Chunks([1, 1]))).toMatchInlineSnapshot(`
        "0,0 1,1 2,2 3,3 4,4
        1,1 2,2 3,3 4,4 5,5"
      `);
    });

    test("5,1", () => {
      expect(printChunks(getDiag0Chunks([5, 1]))).toMatchInlineSnapshot(`
        "4,0 5,1 6,2 7,3 8,4
        5,1 6,2 7,3 8,4 9,5"
      `);
    });

    test("8,1", () => {
      expect(printChunks(getDiag0Chunks([8, 1]))).toMatchInlineSnapshot('""');
    });
    test("4,4", () => {
      expect(printChunks(getDiag0Chunks([4, 4]))).toMatchInlineSnapshot(`
        "0,0 1,1 2,2 3,3 4,4
        1,1 2,2 3,3 4,4 5,5
        2,2 3,3 4,4 5,5 6,6
        3,3 4,4 5,5 6,6 7,7
        4,4 5,5 6,6 7,7 8,8"
      `);
    });
    test("4,7", () => {
      expect(printChunks(getDiag0Chunks([4, 7]))).toMatchInlineSnapshot(`
        "0,3 1,4 2,5 3,6 4,7
        1,4 2,5 3,6 4,7 5,8
        2,5 3,6 4,7 5,8 6,9"
      `);
    });
    test("8,1", () => {
      expect(printChunks(getDiag0Chunks([8, 1]))).toMatchInlineSnapshot('""');
    });
    test("8,8", () => {
      expect(printChunks(getDiag0Chunks([8, 8]))).toMatchInlineSnapshot(`
        "4,4 5,5 6,6 7,7 8,8
        5,5 6,6 7,7 8,8 9,9"
      `);
    });
    test("9,1", () => {
      expect(printChunks(getDiag0Chunks([9, 1]))).toMatchInlineSnapshot('""');
    });
  });

  describe("diagonal 1", () => {
    test("1,1", () => {
      expect(printChunks(getDiag1Chunks([1, 1]))).toMatchInlineSnapshot('""');
    });

    test("5,1", () => {
      expect(printChunks(getDiag1Chunks([5, 1]))).toMatchInlineSnapshot(`
        "1,5 2,4 3,3 4,2 5,1
        2,4 3,3 4,2 5,1 6,0"
      `);
    });

    test("8,8", () => {
      expect(printChunks(getDiag1Chunks([8, 8]))).toMatchInlineSnapshot('""');
    });

    test("4,4", () => {
      expect(printChunks(getDiag1Chunks([4, 4]))).toMatchInlineSnapshot(`
        "0,8 1,7 2,6 3,5 4,4
        1,7 2,6 3,5 4,4 5,3
        2,6 3,5 4,4 5,3 6,2
        3,5 4,4 5,3 6,2 7,1
        4,4 5,3 6,2 7,1 8,0"
      `);
    });

    test("5,5", () => {
      expect(printChunks(getDiag1Chunks([5, 5]))).toMatchInlineSnapshot(`
        "1,9 2,8 3,7 4,6 5,5
        2,8 3,7 4,6 5,5 6,4
        3,7 4,6 5,5 6,4 7,3
        4,6 5,5 6,4 7,3 8,2
        5,5 6,4 7,3 8,2 9,1"
      `);
    });

    test("9,1", () => {
      expect(printChunks(getDiag1Chunks([9, 1]))).toMatchInlineSnapshot(
        '"5,5 6,4 7,3 8,2 9,1"',
      );
    });

    test("8,1", () => {
      expect(printChunks(getDiag1Chunks([8, 1]))).toMatchInlineSnapshot(`
        "4,5 5,4 6,3 7,2 8,1
        5,4 6,3 7,2 8,1 9,0"
      `);
    });

    test("5,9", () => {
      expect(printChunks(getDiag1Chunks([5, 9]))).toMatchInlineSnapshot(
        '"5,9 6,8 7,7 8,6 9,5"',
      );
    });
  });
});

function printChunks(chunks: Location[][]) {
  return chunks
    .map((chunk) => chunk.map((location) => location.join(",")).join(" "))
    .join("\n");
}
