<script lang="ts">
  import { boardConfig, Space, type Location } from "./board-config";
  import Card from "./Card.svelte";
  import Chip from "./Chip.svelte";
  import { BoardState, Game } from "./game";

  export let currentChip: BoardState;
  export let game: Game;
  export let playTurn: (loc: Location) => any;
  const visible = Array.from({ length: boardConfig.rows.length }, () =>
    Array.from({ length: boardConfig.rows[0].length }, () => false),
  );
</script>

<div class="grid px-2 m-auto max-w-[840px] min-w-[360px] gap-1">
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
            class="group grid gap-1 bg-base-200 drop-shadow-sm rounded cursor-pointer place-content-center hover:bg-neutral-focus focus:bg-neutral-focus"
            class:scale-95={state !== BoardState.EMPTY || isFrozen}
            class:bg-neutral={isFrozen}
            on:mouseover={() => (visible[i][j] = true)}
            on:mouseout={() => (visible[i][j] = false)}
            on:blur={() => (visible[i][j] = false)}
            on:focus={() => (visible[i][j] = true)}
            on:click={playTurn([i, j])}
            on:keypress={playTurn([i, j])}
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
