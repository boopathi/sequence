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
  import { BoardState, CompletionPath, Game } from "./game";

  export let currentChip: BoardState;
  export let game: Game;
  export let isRemoving: boolean;
  export let doubleClick: boolean;
  export let fontSize: number;
  export let chipColors: string[];

  export let playTurn: (loc: Location) => any;
</script>

<div
  class="grid my-2 mx-4 sm:mx-16 p-1 rounded m-auto max-w-[1024px] min-w-[360px] gap-1 h-remaining-14 sm:h-remaining-10 select-none border bg-base-100 drop-shadow-lg"
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
          {@const frozenPath = game.getFrozenPath([i, j])}
          {@const state = game.get([i, j])}
          {@const visibility =
            state !== BoardState.EMPTY ? "visible" : "hidden"}
          {@const chip = state === BoardState.EMPTY ? currentChip : state}
          {@const lastLocation = game.history[game.history.length - 1]}
          {@const isLastTurn =
            lastLocation &&
            lastLocation.loc[0] === i &&
            lastLocation.loc[1] === j}
          {@const lastRowCol =
            lastLocation &&
            (lastLocation.loc[0] === i || lastLocation.loc[1] === j)}
          <div
            class="relative grid gap-1 ring-inset ring-success bg-base-100 border content-end justify-center sm:place-content-center"
            class:cursor-pointer={!isRemoving || state === BoardState.EMPTY}
            class:cursor-no-drop={isRemoving}
            class:ring-2={isFrozen}
            class:rounded={!isFrozen}
            tabindex="0"
            data-card={cell}
            data-row={i}
            data-col={j}
            data-frozen={isFrozen}
            data-state={state}
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
            <Card card={cell} class="" bind:fontSize {isFrozen}>
              <Chip
                val={chip}
                {visibility}
                {isFrozen}
                {isLastTurn}
                {chipColors}
              />
            </Card>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
