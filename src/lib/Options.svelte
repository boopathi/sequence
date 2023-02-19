<script lang="ts">
  import { onMount } from "svelte";
  import Modal from "./Modal.svelte";
  import Setting from "./Setting.svelte";
  import { themeChange } from "theme-change";
  import { Game, possibleGames, type GameSetup } from "./game";
  import Chip from "./Chip.svelte";

  export let gameSetup: GameSetup;
  export let reset: () => void;
  export let doubleClick: boolean;
  export let fontSize: number;
  export let game: Game;
  export let chipColors: string[];

  const themes = ["light", "dark", "synthwave", "fantasy", "dracula"];

  const possibleChipColors = [
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
  ];

  let theme = getTheme();

  function getTheme() {
    return typeof document !== "undefined"
      ? localStorage.getItem("theme") ||
          document.documentElement.dataset.theme ||
          "dracula"
      : "dracula";
  }

  function updateChipColor(i: number, color: string) {
    const existing = chipColors.indexOf(color);
    if (existing !== -1) {
      // swap
      chipColors[existing] = chipColors[i];
    }
    chipColors[i] = color;
  }

  $: theme,
    typeof document !== "undefined" &&
      ((document.documentElement.dataset.theme = theme),
      localStorage.setItem("theme", theme));

  onMount(() => {
    themeChange(false); // false parameter is required for svelte
    document.documentElement.dataset.theme =
      localStorage.getItem("theme") || theme;
  });
</script>

<Modal modalName="options-modal" title="Options">
  <div class="form-control grid grid-flow-row gap-4">
    <Setting name="Theme">
      <select class="select select-bordered select-sm" bind:value={theme}>
        {#each themes as theme}
          <option value={theme}>{theme}</option>
        {/each}
      </select>
    </Setting>

    <Setting name="Font Size">
      <div>
        <input
          type="range"
          min="1"
          max="5"
          bind:value={fontSize}
          class="range"
          step="1"
        />
        <div class="w-full flex justify-between text-xs px-2 items-end">
          <span class="text-sm">aA</span>
          <span class="text-base">aA</span>
          <span class="text-lg">aA</span>
          <span class="text-xl">aA</span>
          <span class="text-2xl">aA</span>
        </div>
      </div>
    </Setting>

    <Setting name="Game Setup">
      <select class="select select-bordered select-sm" bind:value={gameSetup}>
        {#each Object.keys(possibleGames) as game}
          <option value={game}>{game.split("vs").join(" vs ")}</option>
        {/each}
      </select>
    </Setting>

    {#each Array(3) as _, i}
      <Setting name={`Player ${i + 1} chip`}>
        <div class="flex gap-2">
          {#each possibleChipColors as color}
            <button
              class="flex gap-1 ring-success ring-offset-2"
              class:ring={chipColors[i] === color}
              on:click={() => {
                updateChipColor(i, color);
              }}
              on:keypress={() => {
                updateChipColor(i, color);
              }}
            >
              <Chip
                val={game.chipFor(i, 3)}
                chipColors={[color, color, color]}
              />
            </button>
          {/each}
        </div>
      </Setting>
    {/each}

    <Setting name="Reset board">
      <button class="btn btn-sm" on:click={reset}>RESET</button>
    </Setting>

    <Setting name="Double Click to play">
      <input type="checkbox" class="checkbox" bind:checked={doubleClick} />
    </Setting>

    <div class="grid grid-cols-2 gap-4">
      <button
        class="btn btn-sm btn-outline"
        on:click={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        Clear
      </button>
      <label
        for="options-modal"
        class="btn btn-sm btn-primary"
        on:click={() => {
          localStorage.setItem("gameSetup", gameSetup);
          localStorage.setItem("doubleClick", doubleClick.toString());
          localStorage.setItem("fontSize", fontSize.toString());
          localStorage.setItem("chipColors", JSON.stringify(chipColors));
        }}
        on:keypress={() => {
          localStorage.setItem("gameSetup", gameSetup);
          localStorage.setItem("doubleClick", doubleClick.toString());
          localStorage.setItem("fontSize", fontSize.toString());
          localStorage.setItem("chipColors", JSON.stringify(chipColors));
        }}
      >
        Save
      </label>
    </div>
  </div>
</Modal>
