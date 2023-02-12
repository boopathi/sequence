<script lang="ts">
  import type { BoardState, Game } from "$lib/game";
  import Chip from "$lib/Chip.svelte";
  import Board from "$lib/Board.svelte";
  import { createGame } from "$lib/store";
  import type { Location } from "$lib/board-config";
  import Title from "$lib/Title.svelte";
  const gameStore = createGame("1vs1");

  let game: Game;
  let currentChip: BoardState;
  let err: Error;
  let playTurn = (loc: Location) => {
    try {
      gameStore.playTurn(loc);
    } catch (e) {
      if (e instanceof Error) err = e;
      else throw e;
    }
  };
  gameStore.subscribe((g) => {
    game = g;
    currentChip = game.currentChip();
  });
</script>

<div class="min-w-[960px]">
  <header
    class="grid gap-1 gap-red-100 grid-cols-[200px_1fr_1fr] items-center py-2 p-4 border-b border-black"
  >
    <Title>Sequence</Title>
    <div class="text-red-500">
      {err?.message || ""}
    </div>
    <div class="flex flex-end items-center gap-4 justify-end">
      <div class="flex flex-initial items-center">
        <div>Current Player:</div>
        <div><Chip bind:val={currentChip} /></div>
      </div>
      <div>
        {game.numPlayers} players
      </div>
      <div>
        {game.numTeams} teams
      </div>
    </div>
  </header>

  <main>
    <Board {game} {playTurn} />
  </main>
</div>
