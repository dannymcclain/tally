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
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 24px;
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    background: #292929;
    border-radius: 4px 4px 0 0;
    padding: 16px;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1);
    width: 100%;
  }

  .controls {
    background: #1f1f1f;
    border-radius: 0 0 4px 4px;
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow: hidden;
  }

  .editing-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .static-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  button {
    display: flex;
    border-radius: 4px;
    padding: 8px 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0;
    transition: background 150ms linear, color 150ms linear,
      opacity 150ms linear;
  }

  .count {
    background: #3d3d3d;
    color: #fff;
    font-weight: bold;
    flex: 0;
    width: 42px;
    min-width: 42px;
    max-width: 42px;
    height: 42px;
    justify-content: center;
    transform: scale(1);
    transition: transform 150ms var(--bezier);
  }
  .count:hover {
    background: #474747;
  }
  .count:active {
    transform: scale(0.95);
  }
  .save,
  .edit,
  .delete {
    font-size: 12px;
    line-height: 1;
    font-weight: bold;
  }
  .save img,
  .edit img,
  .delete img {
    margin-right: 8px;
  }
  .save {
    color: rgba(43, 221, 104, 1);
    background: rgba(43, 221, 104, 0.16);
    margin-right: 8px;
  }
  .save:hover {
    background: rgba(43, 221, 104, 0.32);
  }
  .delete {
    color: rgba(198, 75, 75, 1);
    background: rgba(198, 75, 75, 0.16);
  }
  .delete:hover {
    background: rgba(198, 75, 75, 0.32);
  }

  .edit {
    color: #808080;
    background: transparent;
  }
  .edit:hover {
    background: #333;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    cursor: not-allowed;
    opacity: 0.4;
  }
  input {
    background: #333333;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    flex: 3;
    min-width: 0;
    outline: none;
    padding: 8px;
    margin: 0 16px 0 0;
    border-radius: 4px;
    color: rgba(255, 255, 255, 1);
    transition: border-color 150ms linear, background 150ms linear;
  }
  input:focus {
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
  input:disabled {
    background: transparent;
    border: 2px solid transparent;
    color: #fff;
    opacity: 1;
  }
</style>

<section>
  <div class="content">
    <input
      {id}
      disabled={!editing ? true : null}
      class="title-input"
      type="text"
      bind:value={title} />
    <button disabled={editing ? true : null} class="count" on:click={increment}>
      {count}
    </button>
  </div>

  <div class="controls">
    {#if !editing}
      <div class="static-buttons">
        <button class="edit" on:click={toggleEdit}>
          <img draggable="false" src="./images/icon-edit.svg" alt="edit icon" />
          Edit
        </button>
        <button class="edit" on:click={toggleEdit}>
          <img
            draggable="false"
            src="./images/icon-clear.svg"
            alt="edit icon" />
          Clear
        </button>
      </div>
    {:else if editing}
      <div class="editing-buttons">
        <button
          class="save"
          disabled={title.length > 0 ? null : true}
          on:click={updateTitle}>
          <img draggable="false" src="./images/icon-save.svg" alt="save icon" />
          Save
        </button>
        <button class="delete" on:click={deleteTally}>
          <img
            draggable="false"
            src="./images/icon-delete.svg"
            alt="delete icon" />
          Delete
        </button>
      </div>
    {/if}
  </div>

  <!--end controls -->
  <!-- end entry-->

</section>
