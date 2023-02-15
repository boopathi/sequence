<script lang="ts">
  export let title: string;
  export let modalName: string;
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative">
    <label for={modalName} class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <h3 class="text-2xl">{title}</h3>

    <div class="divider" />

    <slot />
  </div>
</div>
