<script lang="ts">
  import {
    boardConfig,
    Space,
    type Location,
    Card as CardEnum,
    cardname,
  } from "./board-config";
  import Card from "./Card.svelte";
  import Chip from "./Chip.svelte";
  import { BoardState, Game } from "./game";

  export let currentChip: BoardState;
  export let game: Game;
  export let isRemoving: boolean;
  export let doubleClick: boolean;
  export let fontSize: number;

  export let playTurn: (loc: Location) => any;
</script>

<div
  class="grid p-2 m-auto max-w-[1024px] min-w-[360px] gap-1 h-remaining-14 sm:h-remaining-10 select-none "
>
  {#each boardConfig.rows as row, i}
    <div class="grid grid-cols-10 gap-1">
      {#each row as cell, j}
        {#if cell === Space.CORNER}
          <div
            class="grid gap-1 bg-base-100 border rounded place-content-center"
          >
            <Chip val={BoardState.CORNER} />
          </div>
        {:else}
          {@const isFrozen = game.isFrozen([i, j])}
          {@const state = game.get([i, j])}
          {@const visibility =
            state !== BoardState.EMPTY ? "visible" : "hidden"}
          {@const chip = state === BoardState.EMPTY ? currentChip : state}
          <div
            class="relative grid gap-1 bg-base-100 border rounded content-end justify-center sm:place-content-center"
            class:cursor-pointer={!isRemoving || state === BoardState.EMPTY}
            class:cursor-no-drop={isRemoving}
            class:scale-90={state !== BoardState.EMPTY || isFrozen}
            class:outline={isFrozen}
            class:outline-primary={isFrozen}
            class:group={state === BoardState.EMPTY}
            tabindex="0"
            role="button"
            aria-label={`${cardname(cell)}. row ${i + 1} column ${j + 1}`}
            on:dblclick={(e) => {
              if (doubleClick) {
                e.preventDefault();
                playTurn([i, j]);
              }
            }}
            on:click={() => {
              if (!doubleClick) {
                playTurn([i, j]);
              }
            }}
            on:keypress={(e) => {
              if (e.key === "Enter") playTurn([i, j]);
            }}
          >
            <Card card={cell} class="" bind:fontSize>
              <Chip val={chip} {visibility} />
            </Card>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
