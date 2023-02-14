<script lang="ts">
  export let name: string;
</script>

<label class="grid grid-cols-2 items-center">
  <span>{name}</span>
  <slot />
</label>
