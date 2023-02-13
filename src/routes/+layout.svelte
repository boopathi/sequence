<script>
  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const toastOptions = {
    theme: {
      "--toastWidth": "50%",
    },
  };
</script>

<slot />
<SvelteToast options={toastOptions} />
