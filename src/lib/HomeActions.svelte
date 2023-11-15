<script lang="ts">
  import PlaynowButton from "./PlaynowButton.svelte";
  import ReadmoreButton from "./ReadmoreButton.svelte";
  let klass = "";
  export { klass as class };
</script>

<p
  class={`py-10 flex flex-col gap-10 max-w-xs mx-auto sm:flex-row sm:max-w-full sm:mx-0 ${klass}`}
>
  <PlaynowButton />
  <ReadmoreButton />
</p>
