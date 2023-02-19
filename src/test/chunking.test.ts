import type { Location } from "$lib/board-config";
import { getColumnChunks, getRowChunks } from "$lib/game";
import { describe, expect, test } from "vitest";

describe("chunking", () => {
  test("chunking rows - 1", () => {
    expect(printChunks(getRowChunks([5, 1]))).toMatchInlineSnapshot(`
      "5,0 5,1 5,2 5,3 5,4
      5,1 5,2 5,3 5,4 5,5"
    `);
  });

  test("chunking rows - 2", () => {
    expect(printChunks(getRowChunks([1, 1]))).toMatchInlineSnapshot(`
      "1,0 1,1 1,2 1,3 1,4
      1,1 1,2 1,3 1,4 1,5"
    `);
  });

  test("chunking rows - 3", () => {
    expect(printChunks(getRowChunks([1, 9]))).toMatchInlineSnapshot(
      '"1,5 1,6 1,7 1,8 1,9"',
    );
  });

  test("chunking columns - 1", () => {
    expect(printChunks(getColumnChunks([5, 1]))).toMatchInlineSnapshot(`
      "1,1 2,1 3,1 4,1 5,1
      2,1 3,1 4,1 5,1 6,1
      3,1 4,1 5,1 6,1 7,1
      4,1 5,1 6,1 7,1 8,1
      5,1 6,1 7,1 8,1 9,1"
    `);
  });
});

function printChunks(chunks: Location[][]) {
  return chunks
    .map((chunk) => chunk.map((location) => location.join(",")).join(" "))
    .join("\n");
}
