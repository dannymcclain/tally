<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let title;

  function sendTally() {
    dispatch("add", {
      title: title,
      count: 0
    });
    title = "";
  }
</script>

<style>

</style>

<input type="text" bind:value={title} />
<button on:click={sendTally}>Add</button>
