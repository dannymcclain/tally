<script>
  import Header from "./Components/Header.svelte";
  import Tally from "./Components/Tally.svelte";
  import Footer from "./Components/Footer.svelte";
  import NewTally from "./Components/NewTally.svelte";
  import { tallys } from "./stores.js";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { cubicOut } from "svelte/easing";
  onMount(() => {
    const data = JSON.parse(localStorage.getItem("tallys"));
    if (data) {
      tallys.update(entry => data);
    }
  });
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
  :global(:root) {
    --bezier: cubic-bezier(0.4, 0, 0, 1);
  }
  :global(body) {
    font-family: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    background: #000;
    color: rgba(255, 255, 255, 0.4);
  }
  main {
    width: 90%;
    max-width: 480px;
    margin: 0 auto;
  }
</style>

<main>
  <Header />
  <NewTally />
  {#each $tallys as { title, count, id } (id)}
    <div animate:flip={{ duration: 300, easing: cubicOut }}>
      <Tally {title} {count} {id} />
    </div>
  {/each}
  <Footer />

</main>
