<script>
  import { tallys } from "../stores.js";
  export let title;
  export let count;
  export let id;

  function deincrement() {
    let tallysUpdate = Array.from($tallys);
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        if (entry.count >= 1) {
          let lowerCount = (entry.count -= 1);
          entry.count = lowerCount;
        } else {
          return;
        }
      }
      tallys.update(current => tallysUpdate);
      localStorage.setItem("tallys", JSON.stringify($tallys));
    });
  }
  function increment() {
    let tallysUpdate = Array.from($tallys);
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        let higherCount = (entry.count += 1);
        entry.count = higherCount;
      }
      tallys.update(current => tallysUpdate);
      localStorage.setItem("tallys", JSON.stringify($tallys));
    });
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
