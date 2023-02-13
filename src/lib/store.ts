import { writable } from "svelte/store";
import type { Location } from "./board-config";
import { Game, type GameSetup } from "./game";

export function createGame(gameSetup: GameSetup) {
  const gameInst = new Game(gameSetup);

  gameInst.playTurn([1, 1]);
  gameInst.playTurn([2, 1]);
  gameInst.playTurn([2, 2]);
  gameInst.playTurn([3, 1]);
  gameInst.playTurn([3, 3]);
  gameInst.playTurn([4, 1]);
  gameInst.playTurn([4, 4]);

  const { subscribe, set, update } = writable(gameInst);

  return {
    gameInst,
    subscribe,
    playTurn: (loc: Location) =>
      update((game) => {
        game.playTurn(loc);
        return game;
      }),
    undo: () =>
      update((game) => {
        game.undo();
        return game;
      }),
    reset: () => set(new Game(gameSetup)),
  };
}
