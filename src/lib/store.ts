import { writable } from "svelte/store";
import type { Location } from "./board-config";
import { Game, type GameSetup } from "./game";

export function createGame(gameSetup: GameSetup) {
  const gameInst = new Game(gameSetup);

  const { subscribe, set, update } = writable(gameInst);

  return {
    gameInst,
    subscribe,
    playTurn: (loc: Location) =>
      update((game) => {
        game.playTurn(loc);
        return game;
      }),
    reset: () => set(new Game(gameSetup)),
  };
}
