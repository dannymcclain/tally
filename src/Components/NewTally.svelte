<script>
  import { tallys } from "../stores.js";

  function createTally() {
    let newTally = {
      title: title,
      count: 0,
      uid: title.length
      // ^ need to fix this uid
    };
    let newObj = Array.from($tallys);
    newObj.unshift(newTally);
    tallys.update(entry => newObj);
    console.log("Store object:", $tallys);
    title = null;
  }
  let title = null;
</script>

<style>

</style>

<input type="text" bind:value={title} placeholder="Add a title..." />
{#if title}
  <button on:click={createTally}>Add</button>
{:else}
  <button disabled>Add</button>
{/if}
