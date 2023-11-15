<script lang="ts">
  /**
   * v0 by Vercel.
   * @see https://v0.dev/t/bfdClQDE1Pn
   */

  import PlayingCardIcon from "$lib/svgs/PlayingCard.svelte";
  import multiplayerIcon from "$lib/images/multiplayer-2.png";
  import Balloon from "$lib/svgs/Balloon.svelte";
  import CircleFour from "$lib/svgs/CircleFour.svelte";
  import PlayCard from "$lib/svgs/PlayCard.svelte";
  import Strategy from "$lib/svgs/Strategy.svelte";
  import Corners from "$lib/svgs/Corners.svelte";
  import Goal from "$lib/svgs/Goal.svelte";
  import Jacks from "$lib/svgs/Jacks.svelte";
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import Hero from "$lib/Hero.svelte";
  import HomeActions from "$lib/HomeActions.svelte";
</script>

<main class="">
  <section class="w-full hero-bg-image">
    <Header />
    <Hero />
    <section class="w-full py-24 bg-gradient-to-b from-gray-800 to-gray-700">
      <div class="px-4 md:px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center space-y-4">
            <PlayingCardIcon />
            <h3 class="text-2xl font-bold text-gray-100">Card-Based</h3>
            <p class="text-gray-400">
              Use cards to strategize your moves in Sequence.
            </p>
          </div>
          <div class="flex flex-col items-center space-y-4">
            <img alt="Multiplayer" src={multiplayerIcon} width="48" />
            <h3 class="text-2xl font-bold text-gray-100">Multiplayer</h3>
            <p class="text-gray-400">
              Play competitively with friends, from 2 up to 12 players using
              this app as a companion to your physical cards.
            </p>
          </div>
          <div class="flex flex-col items-center space-y-4">
            <Balloon />
            <h3 class="text-2xl font-bold text-gray-100">Fun</h3>
            <p class="text-gray-400">
              A game that is not just challenging, but also a lot of fun to
              play.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full py-24 bg-gradient-to-br from-gray-900 to-gray-800">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h2 class="text-4xl font-bold text-white mb-32">How to Play</h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 gap-y-32"
        >
          <div>
            <CircleFour class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">Setup</h3>
            <p class="text-gray-300 mt-2">
              The game starts with each player being dealt cards. The board is
              set up with each card (except for the Jacks) pictured twice on it.
            </p>
          </div>
          <div>
            <PlayCard class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">Play</h3>
            <p class="text-gray-300 mt-2">
              Players take turns playing a card from their hand and then placing
              a chip on one of the spaces that match this card. Get five of your
              team's chips in a row to score a Sequence.
            </p>
          </div>
          <div>
            <Strategy class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">Strategize</h3>
            <p class="text-gray-300 mt-2">
              Plan your moves carefully! Blocking your opponents while advancing
              your own chips is part of the game. Strategy is key to winning
              Sequence.
            </p>
          </div>
          <div>
            <Jacks class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">
              The Role of Jacks
            </h3>
            <p class="text-gray-300 mt-2">
              Jacks are wild cards. Two-Eyed Jacks can represent any card and
              can be used to place your chip on any open space. One-Eyed Jacks
              can remove an opponent's chip from a space.
            </p>
          </div>
          <div>
            <Corners class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">Corner Slots</h3>
            <p class="text-gray-300 mt-2">
              The four corner spaces on the board are free spaces and count
              toward a Sequence. Use them wisely!
            </p>
          </div>
          <div>
            <Goal class="mx-auto" />
            <h3 class="text-2xl font-bold text-white mt-4">Goal of the Game</h3>
            <p class="text-gray-300 mt-2">
              The goal of the game is to be the first player or team to score
              two Sequences. A Sequence is a connected series of five of the
              same color chip either up or down, across or diagonally on the
              game surface.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full bg-gradient-to-br from-gray-900 to-gray-800">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <HomeActions class="justify-center" />
      </div>
    </section>

    <Footer />
  </section>
</main>
