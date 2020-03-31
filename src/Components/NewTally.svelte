<script>
  import { uuid } from "uuidv4";
  import { tallys } from "../stores.js";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";

  let title = null;
  function createTally() {
    if (title) {
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
    } else {
      return;
    }
  }

  onMount(() => {
    document.addEventListener("keydown", event => {
      if (event.code === "Enter") {
        createTally();
      }
    });
  });
  onDestroy(() => {
    document.removeEventListener("keydown", event);
  });
</script>

<style>
  section {
    position: relative;
  }

  input {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
    padding: 27px 24px;
    background: linear-gradient(180deg, #292929 0%, #1f1f1f 100%);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #2e2e2e;
    border-radius: 6px;
    box-sizing: border-box;
    flex: auto;
    min-width: 0;
    width: 100%;
    outline: none;
    border: none;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
  }
  input:focus {
    background: linear-gradient(180deg, #333333 0%, #292929 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #3d3d3d;
  }
  /* input:focus {
    background: linear-gradient(180deg, #3d3d3d 0%, #333333 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
  } */
  input::placeholder {
    color: #666;
  }
  button {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    margin: 0 0 0 12px;
    height: 40px;
    width: 40px;
    max-width: 40px;
    min-width: 40px;
    background: linear-gradient(180deg, #333333 0%, #292929 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #3d3d3d;
    border-radius: 20px;
    transform: translateY(0);
    transition: transform 100ms cubic-bezier(0.5, 0.25, 0.25, 1);
  }
  button:active:enabled {
    transform: translateY(1px);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

  button img {
    opacity: 1;
  }
  button:hover:enabled {
    background: linear-gradient(180deg, #3d3d3d 0%, #333333 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
  }
  /* button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  } */
</style>

<section>
  <input type="text" bind:value={title} placeholder="Add a tally..." />
  <button disabled={title ? false : true} on:click={createTally}>
    <img src="./images/icon-add.svg" alt="add icon" />
  </button>
</section>
