<script>
  import Modal from "./Modal.svelte";
  import Para from "./Para.svelte";
</script>

<Modal title="About" modalName="about-modal">
  <h1 class="text-xl">Sequence</h1>
  <Para>
    Sequence is a board and card game. The board shows all the cards (except for
    the Jacks) of two (2) standard 52-card decks, laid in a 10 x 10 pattern. The
    four corners are free spaces and count for all players equally.
  </Para>
  <Para>
    The players compete to create rows, columns or diagonals of 5 connected
    checkers placed on the cards that the player has laid down. Two-eyed Jacks
    are wild, while one-eyed Jacks allow an opponent's checker to be removed.
    The game ends when someone has reached a specified number of connections.
  </Para>
</Modal>
