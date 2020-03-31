<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicInOut, cubicOut, backOut } from "svelte/easing";
  import { tallys } from "../stores.js";
  import { onMount } from "svelte";

  export let title;
  export let count;
  export let id;
  export let editing = false;

  let currentInput;

  onMount(() => {
    currentInput = document.getElementById(id);
  });

  function toggleEdit() {
    editing = !editing;
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
  function deleteTally() {
    let tallysUpdate = Array.from($tallys);
    let tallyId;
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        tallyId = entry.id;
      }
    });
    let UpdatedTallyList = tallysUpdate.filter(entry => {
      return entry.id != tallyId;
    });
    tallys.update(current => UpdatedTallyList);
    localStorage.setItem("tallys", JSON.stringify($tallys));
    editing = false;
  }
  function updateTitle() {
    let tallysUpdate = Array.from($tallys);
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        entry.title = title;
      }
      tallys.update(current => tallysUpdate);
      localStorage.setItem("tallys", JSON.stringify($tallys));
    });
    editing = false;
  }
  function clearCount() {
    let tallysUpdate = Array.from($tallys);
    tallysUpdate.forEach(function(entry) {
      if (entry.id === id) {
        entry.count = 0;
      }
      tallys.update(current => tallysUpdate);
      localStorage.setItem("tallys", JSON.stringify($tallys));
    });
  }
</script>

<style>
  :root {
    --transition: 200ms linear;
  }
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
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
    background: linear-gradient(180deg, #333333 0%, #292929 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #3d3d3d;
    border-radius: 6px;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    z-index: 10;
  }

  input:focus {
    background: linear-gradient(180deg, #3d3d3d 0%, #333333 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
  }
  input:disabled {
    background: transparent;
    border: none;
    box-shadow: none;
    color: #fff;
    opacity: 1;
  }

  .controls {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
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
    margin: 0 12px 0 0;
    height: 40px;
    width: 40px;
    max-width: 40px;
    min-width: 40px;
    background: linear-gradient(180deg, #333333 0%, #292929 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #3d3d3d;
    border-radius: 20px;
    transform: translateY(0);
    transition: transform 100ms cubic-bezier(0.5, 0.25, 0.25, 1),
      opacity 200ms linear;
    z-index: 10;
  }

  .default:after {
    border-radius: inherit;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
    background: linear-gradient(180deg, #3d3d3d 0%, #333333 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
    transition: opacity 200ms linear;
  }
  button:last-child {
    margin: 0;
  }
  button:active {
    transform: translateY(1px);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #474747;
  }

  .default-icon {
    transition: stroke 200ms linear;
  }
  .default:hover:after {
    opacity: 1;
  }
  .default:hover .default-icon {
    stroke: #fff;
  }

  .save {
    background: linear-gradient(180deg, #264230 0%, #1e3325 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #295237;
  }
  .save img {
    opacity: 0.8;
    transition: opacity 200ms linear;
  }
  .save:after {
    border-radius: inherit;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
    background: linear-gradient(180deg, #294d36 0%, #1f3d2a 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #2a5c3c;
    transition: opacity 200ms linear;
  }
  .save:hover:after {
    opacity: 1;
  }
  .save:hover img {
    opacity: 1;
  }
  .delete {
    background: linear-gradient(180deg, #402c2c 0%, #332222 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #522f2f;
  }
  .delete img {
    opacity: 0.8;
    transition: opacity 200ms linear;
  }
  .delete:after {
    border-radius: inherit;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
    background: linear-gradient(180deg, #4a3030 0%, #3d2727 100%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 1px 0px #5c3232;
    transition: opacity 200ms linear;
  }
  .delete:hover:after {
    opacity: 1;
  }
  .delete:hover img {
    opacity: 1;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .button-group {
    display: flex;
    flex-direction: row;
    margin-right: 12px;
  }
</style>

<section>
  <input
    {id}
    disabled={!editing ? true : null}
    class="title-input"
    type="text"
    bind:value={title} />
  <div class="controls">
    {#if !editing}
      <div class="button-group">
        <button class="default" on:click={toggleEdit}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              class="default-icon"
              d="M7.5 4.50006L11.5 8.50006M2 10.0001V14.0001H6L13
              7.00006C14.1046 5.89549 14.1046 4.10463 13 3.00006C11.8954 1.89549
              10.1046 1.89549 9 3.00006L2 10.0001Z"
              stroke="#666"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

        </button>
        <button class="default" on:click={clearCount}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              class="default-icon"
              d="M4 12L12 4M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137
              2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
              stroke="#666"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    {:else if editing}
      <div class="button-group">
        <button
          class="save"
          disabled={title.length > 0 ? null : true}
          on:click={updateTitle}>
          <img draggable="false" src="./images/icon-save.svg" alt="save icon" />
        </button>
        <button class="delete" on:click={deleteTally}>
          <img
            draggable="false"
            src="./images/icon-delete.svg"
            alt="delete icon" />
        </button>
      </div>
    {/if}
    <button
      class="count default"
      disabled={editing ? true : null}
      on:click={increment}>
      {count}
    </button>
  </div>

  <!--end controls -->
  <!-- end entry-->

</section>
