<script lang="ts">
  import { boardConfig, Space, type Location } from "./board-config";
  import Card from "./Card.svelte";
  import Chip from "./Chip.svelte";
  import { BoardState, Game } from "./game";

  export let game: Game;
  export let playTurn: (loc: Location) => any;
  const visible = Array.from({ length: boardConfig.rows.length }, () =>
    Array.from({ length: boardConfig.rows[0].length }, () => false),
  );
</script>

<div class="grid w-[960px] m-auto">
  {#each boardConfig.rows as row, i}
    <div class="grid grid-cols-10">
      {#each row as cell, j}
        {#if cell === Space.CORNER}
          <div class="grid border border-black place-content-center">
            <Chip val={BoardState.CORNER} />
          </div>
        {:else}
          <div
            class="grid border border-black place-content-center hover:bg-sky-400"
            on:mouseover={() => (visible[i][j] = true)}
            on:mouseout={() => (visible[i][j] = false)}
            on:blur={() => (visible[i][j] = false)}
            on:focus={() => (visible[i][j] = true)}
            on:click={playTurn([i, j])}
            on:keypress={playTurn([i, j])}
          >
            {#if game.get([i, j]) === BoardState.EMPTY}
              <Card card={cell} class="" />
            {:else}
              <Card card={cell}>
                <Chip val={game.get([i, j])} />
              </Card>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
