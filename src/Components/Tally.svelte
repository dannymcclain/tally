<script>
  // import { tallys } from "./stores.js";
  export let title = "UFOs";
  export let count = 0;

  function deincrement() {
    if (count > 1) {
      count -= 1;
    } else {
      count = 0;
    }
  }
  function increment() {
    count += 1;
  }
</script>

<style>

</style>

<section>
  <p class="title">{title}</p>
  <!-- <input class="count" bind:value={count} /> -->
  <p class="count">{count}</p>
  <button on:click={deincrement}>-</button>
  <button on:click={increment}>+</button>
</section>
