<script>
  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const toastOptions = {
    theme: {},
  };
</script>

<slot />
<SvelteToast options={toastOptions} />
