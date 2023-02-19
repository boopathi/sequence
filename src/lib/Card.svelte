<script lang="ts">
  import { Card } from "./board-config";
  export let card: Card;

  let klass = "";
  export { klass as class };

  export let fontSize: number;

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

<div
  class="absolute px-1 left-0 top-0 tracking-wide z-10"
  class:text-sm={fontSize === 1}
  class:text-base={fontSize === 2}
  class:text-lg={fontSize === 3}
  class:text-xl={fontSize === 4}
  class:text-2xl={fontSize === 5}
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content">
      {suitSymbol}
    </span>
  {:else}
    <span class="text-error"> {suitSymbol}</span>
  {/if}
</div>
<div
  class="absolute px-1 right-0 top-0 tracking-wide z-10"
  class:text-sm={fontSize === 1}
  class:text-base={fontSize === 2}
  class:text-lg={fontSize === 3}
  class:text-xl={fontSize === 4}
  class:text-2xl={fontSize === 5}
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content" class:underline={num === "9"}>
      {num}
    </span>
  {:else}
    <span class="text-error" class:underline={num === "9"}> {num}</span>
  {/if}
</div>

<div
  class="invisible sm:visible absolute px-1 rotate-180 right-0 bottom-0 tracking-wide z-10"
  class:text-sm={fontSize === 1}
  class:text-base={fontSize === 2}
  class:text-lg={fontSize === 3}
  class:text-xl={fontSize === 4}
  class:text-2xl={fontSize === 5}
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content">
      {suitSymbol}
    </span>
  {:else}
    <span class="text-error">
      {suitSymbol}
    </span>
  {/if}
</div>
<div
  class="invisible sm:visible absolute px-1 rotate-180 left-0 bottom-0 tracking-wide z-10"
  class:text-sm={fontSize === 1}
  class:text-base={fontSize === 2}
  class:text-lg={fontSize === 3}
  class:text-xl={fontSize === 4}
  class:text-2xl={fontSize === 5}
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content" class:underline={num === "9"}>
      {num}
    </span>
  {:else}
    <span class="text-error" class:underline={num === "9"}>
      {num}
    </span>
  {/if}
</div>

<div
  class="absolute w-full h-full grid place-content-center "
  class:text-lg={fontSize === 1}
  class:text-xl={fontSize === 2}
  class:text-2xl={fontSize === 3}
  class:text-3xl={fontSize === 4}
  class:text-4xl={fontSize === 5}
>
  {#if suit === "S" || suit === "C"}
    <span class="text-base-content">{suitSymbol}</span>
  {:else}
    <span class="text-error">{suitSymbol}</span>
  {/if}
</div>

<div class={`grid place-content-center pb-1 sm:pb-0 z-20 ${klass} `}>
  <slot />
</div>
