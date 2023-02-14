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
  import { themeChange } from "theme-change";
  import Setting from "$lib/Setting.svelte";

  const themes = [
    "light",
    "dark",
    "cupcake",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "luxury",
    "dracula",
  ];

  let gameSetup: GameSetup = "1vs1";

  let theme = getTheme();

  function getTheme() {
    return typeof document !== "undefined"
      ? localStorage.getItem("theme") ||
          document.documentElement.dataset.theme ||
          "dracula"
      : "dracula";
  }

  $: theme,
    typeof document !== "undefined" &&
      ((document.documentElement.dataset.theme = theme),
      localStorage.setItem("theme", theme));

  onMount(() => {
    themeChange(false); // false parameter is required for svelte
    document.documentElement.dataset.theme =
      localStorage.getItem("theme") || theme;
  });

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
        <button class="btn btn-outline btn-xs">About</button>
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

      <button class="uppercase">Info</button>

      <label for="options-modal" class="uppercase">Options</label>
    </div>
  </footer>
</div>

<input type="checkbox" id="options-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative">
    <label
      for="options-modal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg">OPTIONS</h3>

    <div class="divider" />

    <div class="form-control grid grid-flow-row gap-4">
      <Setting name="Theme">
        <select class="select select-bordered select-sm" bind:value={theme}>
          {#each themes as theme}
            <option value={theme}>{theme}</option>
          {/each}
        </select>
      </Setting>

      <Setting name="Game Setup">
        <select class="select select-bordered select-sm" bind:value={gameSetup}>
          {#each Object.keys(possibleGames) as game}
            <option value={game}>{game.split("vs").join(" vs ")}</option>
          {/each}
        </select>
      </Setting>

      <Setting name="Reset board">
        <button class="btn btn-sm" on:click={reset}>RESET</button>
      </Setting>

      <Setting name="Double Click to play">
        <input type="checkbox" class="checkbox" bind:checked={doubleClick} />
      </Setting>

      <div class="grid grid-cols-2 gap-4">
        <button
          class="btn btn-sm btn-outline"
          on:click={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Clear
        </button>
        <label
          for="options-modal"
          class="btn btn-sm btn-primary"
          on:click={() => {
            localStorage.setItem("gameSetup", gameSetup);
            localStorage.setItem("doubleClick", doubleClick.toString());
          }}
          on:keypress={() => {
            localStorage.setItem("gameSetup", gameSetup);
            localStorage.setItem("doubleClick", doubleClick.toString());
          }}
        >
          Save
        </label>
      </div>
    </div>
  </div>
</div>
