<script>
  import { uuid } from "uuidv4";
  import { tallys } from "../stores.js";
  import { onMount } from "svelte";
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

  onMount(() => {
    document.addEventListener("keydown", event => {
      if (event.code === "Enter") {
        createTally();
      }
    });
  });
</script>

<style>
  section {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    font-size: 16px;
    line-height: 1;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 24px;
  }
  input {
    flex: 2;
    background: rgba(255, 255, 255, 0);
    outline: none;
    border: none;
    padding: 13px 0;
    margin: 0 16px 0 0;
    cursor: text;
    color: rgba(255, 255, 255, 1);
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  button {
    flex: none;
    display: inline-flex;
    width: 28px;
    height: 28px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    transition: background 300ms var(--bezier);
  }
  button:hover {
    background: rgba(255, 255, 255, 1);
  }
  button:disabled {
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.25);
  }
</style>

<section>
  <input type="text" bind:value={title} placeholder="Add a tally..." />
  <button disabled={title ? false : true} on:click={createTally}>
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 1V11M1 6H11"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </button>
</section>
