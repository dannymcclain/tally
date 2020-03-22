<script>
  import { uuid } from "uuidv4";
  import { tallys } from "../stores.js";
  function createTally() {
    let newTally = {
      title: title,
      count: 0,
      id: uuid()
    };
    let newTallys = Array.from($tallys);
    newTallys.unshift(newTally);
    tallys.update(current => newTallys);
    localStorage.setItem("tallys", JSON.stringify($tallys));
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
