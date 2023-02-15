<script lang="ts">
  import {
    possibleGames,
    type BoardState,
    type Game,
    type GameSetup,
  } from "$lib/game";
  import Chip from "$lib/Chip.svelte";
  import Board from "$lib/Board.svelte";
  import { createGame } from "$lib/store";
  import type { Location } from "$lib/board-config";
  import Title from "$lib/Title.svelte";
  import { failure } from "$lib/toast";
  import { onMount } from "svelte";
  import About from "$lib/About.svelte";
  import Options from "$lib/Options.svelte";

  let gameSetup: GameSetup = "1vs1";

  let gameStore = createGame(gameSetup);

  $: gameSetup, gameStore.reset(gameSetup);

  let game: Game;
  let currentChip: BoardState;
  let score: { team: BoardState; score: number }[];

  let isRemoving = false;

  let remove = () => {
    isRemoving = !isRemoving;
  };

  let doubleClick = false;

  onMount(() => {
    let gs = localStorage.getItem("gameSetup") as GameSetup;
    if (gs) {
      gs = gs as GameSetup;
      if (possibleGames.hasOwnProperty(gs)) {
        gameSetup = gs;
      }
    }
    let dc = localStorage.getItem("doubleClick");
    if (dc) {
      doubleClick = dc === "true";
    }
  });

  let playTurn = (loc: Location) => {
    try {
      if (isRemoving) {
        gameStore.remove(loc);
        isRemoving = false;
      } else {
        gameStore.playTurn(loc);
      }
    } catch (e) {
      if (e instanceof Error) failure(e.message);
      else failure(e as any);
    }
  };
  let undo = () => {
    try {
      gameStore.undo();
      isRemoving = false;
    } catch (e) {
      if (e instanceof Error) failure(e.message);
      else failure(e as any);
    }
  };
  let reset = () => {
    try {
      gameStore.reset();
      isRemoving = false;
    } catch (e) {
      if (e instanceof Error) failure(e.message);
      else failure(e as any);
    }
  };

  gameStore.subscribe((g) => {
    game = g;
    score = game.score();
    currentChip = game.currentChip();
  });
</script>

<div class="max-w-[960px] m-auto">
  <header
    class="min-h-16 mb-6 sm:mb-2 px-2 grid gap-2 grid-cols-3 items-center bg-base-100"
  >
    <div class="">
      <Title><a href="/">Sequence</a></Title>
    </div>

    <div class="flex justify-center place-items-center portrait:invisible">
      <div class="btn-group">
        <button
          on:click={undo}
          disabled={!game.hasUndo()}
          class="btn btn-outline btn-xs"
          class:btn-disabled={!game.hasUndo()}
        >
          Undo
        </button>
        <label for="options-modal" class="btn btn-outline btn-xs">
          Options
        </label>
        <label for="about-modal" class="btn btn-outline btn-xs">About</label>
        <button
          class="uppercase btn btn-outline btn-xs"
          class:bg-error={isRemoving}
          disabled={!game.hasUndo()}
          on:click={remove}
        >
          {#if isRemoving}
            Cancel
          {:else}
            Remove
          {/if}
        </button>
      </div>
    </div>

    <div class="grid grid-flow-col items-center justify-end gap-2 pr-2">
      {#each score as s, i}
        {@const isCurrent = s.team === currentChip}
        <div
          class={`indicator mx-2 rounded-full ring ring-offset-base-100 ring-offset-2 ${
            isCurrent ? "ring-success" : "ring-neutral"
          }`}
        >
          <span class="indicator-item badge badge-primary">{s.score}</span>
          <Chip val={s.team} class={`${isCurrent ? "animate-spin" : ""}`} />
        </div>
      {/each}
    </div>
  </header>

  <main>
    <Board
      {game}
      {playTurn}
      bind:currentChip
      bind:isRemoving
      bind:doubleClick
    />
  </main>

  <footer>
    <div
      class="landscape:invisible btm-nav btm-nav-md border-t text-sm uppercase"
    >
      <button
        on:click={undo}
        disabled={!game.hasUndo()}
        class:disabled={!game.hasUndo()}
        class="uppercase"
      >
        UNDO
      </button>

      <button
        class:bg-error={isRemoving}
        class:text-error-content={isRemoving}
        disabled={!game.hasUndo()}
        on:click={remove}
        class="uppercase"
      >
        {#if isRemoving}
          Cancel
        {:else}
          Remove
        {/if}
      </button>

      <label for="about-modal" class="uppercase">About</label>

      <label for="options-modal" class="uppercase">Options</label>
    </div>
  </footer>
</div>

<Options bind:gameSetup bind:doubleClick {reset} />

<About />
