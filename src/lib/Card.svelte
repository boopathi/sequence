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

<div class="absolute">
  {#if suit === "S" || suit === "C"}
    <span class="text-black">{suitSymbol}&nbsp;{num}</span>
  {:else}
    <span class="text-red-500">{suitSymbol}&nbsp;{num}</span>
  {/if}
</div>
<div class={`grid place-content-center h-16 ${klass}`}>
  <slot />
</div>
