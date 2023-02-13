<script lang="ts">
  import type { BoardState, Game } from "$lib/game";
  import Chip from "$lib/Chip.svelte";
  import Board from "$lib/Board.svelte";
  import { createGame } from "$lib/store";
  import type { Location } from "$lib/board-config";
  import Title from "$lib/Title.svelte";
  import { failure } from "$lib/toast";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";

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

  const gameStore = createGame("2vs2");

  let game: Game;
  let currentChip: BoardState;
  let score: { team: BoardState; score: number }[];

  let isRemoving = false;

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
    class="min-h-16 mb-6 sm:mb-2 px-2 grid gap-2 grid-cols-[min-content_1fr] sm:grid-cols-[min-content_1fr_min-content_min-content] items-center bg-base-100"
  >
    <div class="justify-self-start">
      <Title><a href="/">Sequence</a></Title>
    </div>

    <div class="flex-none py-2 sm:py-0">
      <ul class="flex flex-wrap justify-end items-center gap-2">
        <li>
          <button class="btn btn-outline btn-xs" on:click={reset}>
            Reset
          </button>
        </li>
        <li>
          <button
            on:click={undo}
            disabled={!game.hasUndo()}
            class="btn btn-outline btn-xs"
            class:btn-disabled={!game.hasUndo()}
          >
            Undo
          </button>
        </li>
        <li>
          <select class="select select-xs" bind:value={theme}>
            {#each themes as theme}
              <option value={theme}>{theme}</option>
            {/each}
          </select>
        </li>
      </ul>
    </div>

    <div class="whitespace-nowrap flex items-center gap-1">
      <label
        for="remove"
        class="label label-xs"
        class:toggle-disabled={!game.hasUndo()}>Remove</label
      >
      <input
        type="checkbox"
        id="remove"
        disabled={!game.hasUndo()}
        class="toggle toggle-warning toggle-xs"
        bind:checked={isRemoving}
      />
    </div>
    <div class="grid grid-flow-col items-center justify-center gap-2">
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
    <Board {game} {playTurn} bind:currentChip bind:isRemoving />
  </main>
</div>
