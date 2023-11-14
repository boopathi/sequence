<script lang="ts">
  let klass: string;
  export { klass as class };
  export let size = "48px";
</script>

<svg
  class={klass}
  width={size}
  height={size}
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
>
  <path
    style="fill:#4CBB4F;stroke:#FFFFFF;stroke-width:1"
    d="M 6,94 32,92 25,85 35,77 22,65 15,74 8,67 z m 88,0 -2,-26 -7,7 -8,-10 -12,13 9,7 -7,7 z m 0,-88 -26,2 7,7 -10,8 13,12 7,-9 7,7 z M 6,6 8.3,32 15,25 23,35 35,22 26,15 33,8.3 z"
  />
  <path
    style="fill:none;stroke:#FFFFFF;stroke-width:1"
    d="M 2,2 98,2 98,98 2,98 z"
  />
</svg>
