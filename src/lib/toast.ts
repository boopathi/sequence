import { toast } from "@zerodevx/svelte-toast";

export const success = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "green",
      "--toastColor": "white",
      "--toastBarBackground": "olive",
    },
  });

export const warning = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "orange",
      "--toastColor": "white",
      "--toastBarBackground": "yellow",
    },
  });

export const failure = (m: string) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarBackground": "maroon",
    },
  });
