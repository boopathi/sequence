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

<div class="absolute px-1 text-sm">
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content group-hover:text-neutral-content"
      >{suitSymbol}&nbsp;{num}</span
    >
  {:else}
    <span class="text-error">{suitSymbol}&nbsp;{num}</span>
  {/if}
</div>
<div class={`grid place-content-center h-16 ${klass}`}>
  <slot />
</div>
