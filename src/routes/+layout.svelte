<script>
  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const toastOptions = {
    theme: {
      "--toastWidth": "40rem",
    },
  };
</script>

<slot />
<SvelteToast options={toastOptions} />
