<script>
  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const toastOptions = {
    reversed: true,
    intro: { y: 192 },
    theme: {},
  };
</script>

<slot />
<SvelteToast options={toastOptions} />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
