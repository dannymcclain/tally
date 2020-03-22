<script>
  import { tallys } from "../stores.js";
  export let title;
  export let count;
  export let id;

  let tallysUpdate = Array.from($tallys);
  function deincrement() {
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        let newCount = (entry.count -= 1);
        entry.count = newCount;
      }
      tallys.update(current => tallysUpdate);
    });

    // if (count > 1) {
    //   count -= 1;
    // } else {
    //   count = 0;
    // }
  }
  function increment() {
    count += 1;
  }
</script>

<style>

</style>

<section>
  <p class="title">{title}</p>
  <p class="count">{count}</p>
  <button on:click={deincrement}>-</button>
  <button on:click={increment}>+</button>
</section>
