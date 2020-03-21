<script>
  import Header from "./Components/Header.svelte";
  import Tally from "./Components/Tally.svelte";
  import Footer from "./Components/Footer.svelte";
  import NewTally from "./Components/NewTally.svelte";
  import { testObj } from "./stores.js";
  import { onMount } from "svelte";

  let tallys = [];
  let placeholder = [
    { title: "Morning runs 🏃‍♂️", count: 0 },
    { title: "UFO sightings 🛸", count: 4 },
    { title: "Daily vitamins 💊", count: 56 },
    { title: "Vampires hunted 🧛🏻‍♂️", count: 13 }
  ];
  onMount(() => {
    tallys = [
      { title: "Morning runs 🏃‍♂️", count: 0 },
      { title: "UFO sightings 🛸", count: 4 },
      { title: "Daily vitamins 💊", count: 56 },
      { title: "Vampires hunted 🧛🏻‍♂️", count: 13 }
    ];
    // tallys = placeholder.map(entry => {
    //   entry = { title: entry.title, count: entry.count };
    //   tallys.push(entry);
    //   tallys = tallys;
    // });
  });

  function createTally(event) {
    let tally = {
      title: event.detail.title,
      count: 0
    };
    tallys.push(tally);
    tallys = tallys.reverse();
    console.log(tallys);
  }
</script>

<style global>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");

  body {
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
  <Tally />
  <Header />
  <NewTally on:add={createTally} />
  {#each tallys as entry}
    <Tally title={entry.title} count={entry.count} />
  {/each}
  <!-- 	
  <Tally title="Morning runs 🏃‍♂️" />
  <Tally title="UFO sightings 🛸" />
  <Tally title="Daily vitamins 💊" />
  <Tally title="Vampires hunted 🧛🏻‍♂️" /> -->

  <Footer />
</main>
