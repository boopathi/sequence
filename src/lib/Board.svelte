<script lang="ts">
  import { boardConfig, Space, type Location } from "./board-config";
  import Card from "./Card.svelte";
  import Chip from "./Chip.svelte";
  import { BoardState, Game } from "./game";

  export let currentChip: BoardState;
  export let game: Game;
  export let isRemoving: boolean;
  export let playTurn: (loc: Location) => any;
  const visible = Array.from({ length: boardConfig.rows.length }, () =>
    Array.from({ length: boardConfig.rows[0].length }, () => false),
  );
</script>

<div
  class="grid p-2 m-auto max-w-[840px] min-w-[360px] gap-1 min-h-[560px] h-remaining-10 sm:h-remaining-6"
>
  {#each boardConfig.rows as row, i}
    <div class="grid grid-cols-10 gap-1">
      {#each row as cell, j}
        {#if cell === Space.CORNER}
          <div
            class="grid gap-1 bg-base-200 drop-shadow-sm rounded place-content-center"
          >
            <Chip val={BoardState.CORNER} />
          </div>
        {:else}
          {@const isFrozen = game.isFrozen([i, j])}
          {@const state = game.get([i, j])}
          {@const visibility =
            state !== BoardState.EMPTY
              ? "visible"
              : visible[i][j]
              ? "partial"
              : "hidden"}
          {@const chip = state === BoardState.EMPTY ? currentChip : state}
          <div
            class="relative grid gap-1 bg-base-200 drop-shadow-sm rounded place-content-center"
            class:cursor-pointer={!isRemoving || state === BoardState.EMPTY}
            class:cursor-no-drop={isRemoving}
            class:scale-90={state !== BoardState.EMPTY || isFrozen}
            class:outline={isFrozen}
            class:outline-primary={isFrozen}
            class:bg-base-300={state !== BoardState.EMPTY}
            class:group={state === BoardState.EMPTY}
            class:hover:bg-neutral-focus={state === BoardState.EMPTY}
            class:focus:bg-neutral-focus={state === BoardState.EMPTY}
            on:mouseover={() => (visible[i][j] = true)}
            on:mouseout={() => (visible[i][j] = false)}
            on:blur={() => (visible[i][j] = false)}
            on:focus={() => (visible[i][j] = true)}
            on:click={() => {
              playTurn([i, j]);
              visible[i][j] = false;
            }}
            on:keypress={() => {
              playTurn([i, j]);
              visible[i][j] = false;
            }}
          >
            <Card card={cell} class="">
              <Chip val={chip} {visibility} />
            </Card>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
