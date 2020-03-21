<script>
  import Header from "./Components/Header.svelte";
  import Tally from "./Components/Tally.svelte";
  import Footer from "./Components/Footer.svelte";
  import NewTally from "./Components/NewTally.svelte";
  import { testObj } from "./stores.js";
  import { onMount } from "svelte";

  // let tallys = [];
  // let placeholder = [
  //   { title: "Morning runs 🏃‍♂️", count: 0 },
  //   { title: "UFO sightings 🛸", count: 4 },
  //   { title: "Daily vitamins 💊", count: 56 },
  //   { title: "Vampires hunted 🧛🏻‍♂️", count: 13 }
  // ];
  onMount(() => {
    // $testObj.forEach(element => {
    //   console.log(element);
    // });
    console.log("The test object is", $testObj);
  });

  function createTally(event) {
    let item = {
      title: event.detail.title,
      count: event.detail.count,
      uid: event.detail.title.length
    };
    testObj.update(entry => {
      entry.unshift(item);
    });
  }
  // let tally = {
  //   title: event.detail.title,
  //   count: 0
  // };
  // tallys.push(tally);
  // tallys = tallys.reverse();
  // console.log(tallys); }
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
  {#each $testObj as object, i}
    <p>{i + 1}. {object.title}, {object.count}</p>
  {/each}

  <NewTally on:add={createTally} />

  {#each $testObj as { title, count }}
    <Tally {title} {count} />
  {/each}

  <Footer />
</main>
