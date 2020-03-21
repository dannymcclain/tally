<script>
  import Header from "./Components/Header.svelte";
  import Tally from "./Components/Tally.svelte";
  import Footer from "./Components/Footer.svelte";
  import NewTally from "./Components/NewTally.svelte";
  import { testObj } from "./stores.js";
  import { onMount } from "svelte";

  // let testObj = [
  //   { title: "red", count: 1, uid: 1 },
  //   { title: "blue", count: 2, uid: 2 },
  //   { title: "green", count: 3, uid: 3 },
  //   { title: "yellow", count: 4, uid: 4 }
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
    let newObj = Array.from($testObj);
    newObj.unshift(item);
    console.log("New object:", newObj);
    testObj.update(entry => newObj);
    console.log("Store object:", $testObj);
    // testObj.update(entry => {
    //   entry.unshift(item);
    //   entry = entry;
    //   console.log(entry);
    // });
  }
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
