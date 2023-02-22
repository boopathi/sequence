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
  import Modal from "$lib/Modal.svelte";
  import Setting from "$lib/Setting.svelte";

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

  let showTwoSides = true;
  let doubleClick = false;
  let fontSize = 2;
  let chipColors = ["accent", "primary", "secondary"];

  let isDone: BoardState | false = false;
  let winner: BoardState;
  let isDoneModal: any;
  $: game,
    (isDone = game.isDone()),
    isDone && (winner = isDone) && isDoneModal.click();

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
    let fs = localStorage.getItem("fontSize");
    if (fs) {
      fontSize = parseInt(fs, 10);
      if (isNaN(fontSize)) {
        fontSize = 3;
      }
    }
    let cc = localStorage.getItem("chipColors");
    if (cc) {
      chipColors = JSON.parse(cc);
    }
    let ts = localStorage.getItem("showTwoSides");
    if (ts) {
      showTwoSides = ts === "true";
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
      gameStore.reset(gameSetup);
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
    <div>
      <Title />
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
        <label
          for="options-modal"
          class="btn btn-outline btn-xs"
          role="menuitem"
          tabindex="0"
        >
          Options
        </label>
        <label
          for="about-modal"
          class="btn btn-outline btn-xs"
          role="menuitem"
          tabindex="0"
        >
          About
        </label>
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
          <Chip
            val={s.team}
            class={`${isCurrent ? "animate-spin" : ""}`}
            bind:chipColors
          />
        </div>
      {/each}
    </div>
  </header>

  <main>
    <Board
      {game}
      {playTurn}
      bind:fontSize
      bind:currentChip
      bind:isRemoving
      bind:doubleClick
      bind:chipColors
      bind:showTwoSides
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

      <label for="about-modal" class="uppercase" role="menuitem" tabindex="0">
        About
      </label>

      <label for="options-modal" class="uppercase" role="menuitem" tabindex="0">
        Options
      </label>
    </div>
  </footer>
</div>

<Options
  bind:gameSetup
  bind:doubleClick
  {reset}
  bind:fontSize
  bind:game
  bind:chipColors
  bind:showTwoSides
/>

<About />

<label for="game-over-modal" class="invisible" bind:this={isDoneModal} />
<Modal title="Game over" modalName="game-over-modal" closable={false}>
  <div class="form-control grid grid-flow-row gap-4">
    <h2 class="text-2xl font-bold flex gap-2 place-content-center">
      <Chip val={winner} bind:chipColors /> wins!
    </h2>
    <div class="flex justify-center gap-2">
      {#each score as s, i}
        <div class="flex flex-col items-center">
          <Chip val={s.team} bind:chipColors />
          <span class="text-2xl font-bold">{s.score}</span>
        </div>
      {/each}
    </div>
    <Setting name="Wrong move??">
      <button
        class="btn btn-sm"
        on:click={() => {
          undo();
          isDoneModal.click();
        }}>UNDO</button
      >
    </Setting>
    <Setting name="Start a new Game">
      <button
        class="btn btn-sm"
        on:click={() => {
          reset();
          isDoneModal.click();
        }}>Restart</button
      >
    </Setting>
  </div>
</Modal>
