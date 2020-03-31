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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 64px;
    padding: 16px;
    background: linear-gradient(180deg, #292929 0%, #1f1f1f 100%);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #2e2e2e;
    border-radius: 6px;
  }

  input {
    box-sizing: border-box;
    flex: auto;
    min-width: 0;
    width: 100%;
    outline: none;
    border: none;
    padding: 9px;
    margin: 0 16px 0 0;
    background: transparent;
    box-shadow: none;
    border-radius: 6px;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    z-index: 10;
  }
  input:focus {
    background: linear-gradient(180deg, #333333 0%, #292929 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #3d3d3d;
  }
  input::placeholder {
    color: #666;
  }

  button {
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
    margin: 0;
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
  button svg {
    opacity: 1;
  }
  button:hover:enabled {
    background: linear-gradient(180deg, #3d3d3d 0%, #333333 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>

<section>
  <input type="text" bind:value={title} placeholder="Add a tally..." />
  <button disabled={title ? false : true} on:click={createTally}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00001 2.99994V12.9999M2.99945 8.00001H12.9995"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>

  </button>
</section>
