<script lang="ts">
  import logo from "$lib/images/apple-icon.png";
</script>

<header
  class="flex h-16 items-center px-4 md:px-6 bg-gradient-to-br from-gray-800 to-gray-700"
>
  <a class="mr-6" href="/">
    <img alt="Logo" class="h-8 w-8" height={32} src={logo} width={32} />
    <span class="sr-only">Sequence Game</span>
  </a>
  <nav class="ml-auto">
    <ul class="flex gap-8">
      <li>
        <a class="text-white" href="/">Home</a>
      </li>
      <li>
        <a class="text-white" href="/game">Play Now!</a>
      </li>
    </ul>
  </nav>
</header>
