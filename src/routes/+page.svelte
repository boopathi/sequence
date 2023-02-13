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

  let theme = "dracula";

  $: theme,
    typeof document !== "undefined" &&
      (document.documentElement.dataset.theme = theme);

  onMount(() => {
    themeChange(false); // false parameter is required for svelte
    document.documentElement.dataset.theme = "dracula";
  });

  const gameStore = createGame("2vs2");

  let game: Game;
  let currentChip: BoardState;
  let score: { team: BoardState; score: number }[];
  let playTurn = (loc: Location) => {
    try {
      gameStore.playTurn(loc);
    } catch (e) {
      if (e instanceof Error) failure(e.message);
      else failure(e as any);
    }
  };
  let undo = () => {
    try {
      gameStore.undo();
    } catch (e) {
      if (e instanceof Error) failure(e.message);
      else failure(e as any);
    }
  };
  let reset = () => {
    try {
      gameStore.reset();
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

<div class="min-w-[960px]">
  <header class="navbar bg-base-100">
    <Title><a href="/">Sequence</a></Title>
    <div class="flex-none">
      <nav>
        <ul class="menu menu-horizontal px-1 items-center gap-2">
          <li>
            <button class="btn btn-outline" on:click={reset}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 3v5h5" />
                <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
                <path d="M12 7v5l4 2" />
              </svg>

              Reset
            </button>
          </li>
          <li>
            <button
              on:click={undo}
              disabled={!game.hasUndo()}
              class="btn btn-outline"
              class:btn-disabled={!game.hasUndo()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
              </svg>
              Undo</button
            >
          </li>

          <li>
            {#each score as s, i}
              <span><Chip val={s.team} />{s.score}</span>
            {/each}
          </li>
          <li>
            <span>Current Player: <Chip bind:val={currentChip} /></span>
          </li>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <div>
              <select class="select" bind:value={theme}>
                {#each themes as theme}
                  <option value={theme}>{theme}</option>
                {/each}
              </select>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <Board {game} {playTurn} bind:currentChip />
  </main>
</div>
