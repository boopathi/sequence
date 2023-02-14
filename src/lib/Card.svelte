<script lang="ts">
  import { Card } from "./board-config";
  export let card: Card;

  let klass = "";
  export { klass as class };

  let [suit, ...rest] = Card[card];
  let suitSymbol: string;
  switch (suit) {
    case "S":
      suitSymbol = "♠";
      break;
    case "H":
      suitSymbol = "♥";
      break;
    case "D":
      suitSymbol = "♦";
      break;
    case "C":
      suitSymbol = "♣";
      break;
  }
  const num = rest.join("");
</script>

<div class="absolute px-1 text-xs sm:text-base tracking-wide">
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content group-hover:text-neutral-content">
      {suitSymbol}{num}
    </span>
  {:else}
    <span class="text-error">{suitSymbol}{num}</span>
  {/if}
</div>
<div
  class="invisible sm:visible absolute px-1 text-xs sm:text-base rotate-180 right-0 bottom-0 tracking-wide"
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content group-hover:text-neutral-content">
      {suitSymbol}{num}
    </span>
  {:else}
    <span class="text-error">{suitSymbol}{num}</span>
  {/if}
</div>

<!-- <div class="absolute text-xl w-full h-full grid place-content-center ">
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content group-hover:text-neutral-content"
      >{suitSymbol}</span
    >
  {:else}
    <span class="text-error">{suitSymbol}</span>
  {/if}
</div> -->
<div class={`grid place-content-center pb-2 sm:pb-0 ${klass}`}>
  <slot />
</div>
