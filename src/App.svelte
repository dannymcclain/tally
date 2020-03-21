<script>
  import Header from "./Components/Header.svelte";
  import Tally from "./Components/Tally.svelte";
  import Footer from "./Components/Footer.svelte";
  import NewTally from "./Components/NewTally.svelte";
  import { tallys } from "./stores.js";
  import { onMount } from "svelte";
  onMount(() => {
    // console.log("The test object is", $tallys);
  });
</script>

<style global>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");

  :global(body) {
    font-family: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Header />

  <NewTally />

  {#each $tallys as { title, count }}
    <Tally {title} {count} />
  {/each}

  <Footer />
</main>
