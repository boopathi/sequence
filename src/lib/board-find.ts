import { boardConfig, Card, type Location } from "./board-config";

export function getLocation(card: Card): Location | undefined {
  for (let i = 0; i < boardConfig.rows.length; i++) {
    for (let j = 0; j < boardConfig.rows[0].length; j++) {
      if (boardConfig.rows[i][j] === card) {
        return [i, j];
      }
    }
  }
}

// export type Tuple2<A> = [A, A];
// export type Tuple4<A> = [A, A, A, A];

// export function getBoardLocations(
//   space: Space | Card,
// ): Tuple4<Location> | Tuple2<Location> {
//   if (space === P.CORNER) {
//     return [
//       [0, 0],
//       [0, boardConfig.rows[0].length - 1],
//       [boardConfig.rows.length - 1, 0],
//       [boardConfig.rows.length - 1, boardConfig.rows[0].length - 1],
//     ];
//   }
//   const locations = [];
//   for (const [i, row] of boardConfig.rows.entries()) {
//     for (const [j, item] of row.entries()) {
//       if (item === space) {
//         const loc = [i, j] satisfies Location;
//         locations.push(loc);
//       }
//     }
//   }
//   return locations as Tuple2<Location>;
// }

// function getRandomBoard(numMoves = 40, numTeams: 2 | 3 = 2) {
//   const board = new Board();
//   const nr = boardConfig.rows.length;
//   const nc = boardConfig.rows[0].length;
//   for (let i = 0; i < numMoves; i++) {
//     const card = randCard();

//     const x = rand(0, nr);
//     const y = rand(0, nc);
//   }
// }

// function randCard() {
//   const suit = rand(0, 4);
//   const num = rand(0, 12);
//   return suits[suit] + nums[num];
// }

// function rand(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function randChip(numPlayers: 2 | 3) {
//   const player = rand(0, numPlayers);
//   return [BoardState.RED_CHIP, BoardState.GREEN_CHIP, BoardState.BLUE_CHIP][
//     player
//   ];
// }
