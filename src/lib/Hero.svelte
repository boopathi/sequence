<script>
  import logo from "$lib/images/apple-icon-white.png";
  import HomeActions from "$lib/HomeActions.svelte";
  import { Parallax, ParallaxLayer } from "svelte-parallax";
</script>

<Parallax
  sections={1}
  threshold={{ top: -1, bottom: 0.8 }}
  config={{ stiffness: 1, damping: 1 }}
>
  <ParallaxLayer rate={-0.5}>
    <section class="w-full">
      <div
        class="container mx-auto px-4 md:px-6 py-32 text-center sm:text-left"
      >
        <img
          alt="Logo"
          class="mx-auto sm:mx-0 mb-16 aspect-square object-cover"
          height={100}
          src={logo}
          width={100}
        />
        <h1
          class="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-white"
        >
          Sequence - The Board Game
        </h1>
        <p class="max-w-3xl text-lg mt-6 text-white">
          A fun and challenging game that requires strategic skills to win. Play
          with cards and enhance your strategic thinking.
        </p>
        <HomeActions />
      </div>
    </section>
  </ParallaxLayer>
</Parallax>
