<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicInOut, cubicOut, backOut } from "svelte/easing";
  import { tallys } from "../stores.js";

  export let title;
  export let count;
  export let id;
  export let editing = false;

  let transitionIn = {
    y: 50,
    duration: 275,
    easing: backOut,
    delay: 225
  };
  let transitionOut = { x: -100, duration: 225, easing: cubicOut };

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
    align-items: flex-end;
    margin-bottom: 24px;
    padding: 12px 16px 12px 12px;
    background: #292929;
    border-radius: 4px;
    overflow: hidden;
  }
  .entry {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1);
    width: 100%;
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
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    transition: background 200ms linear;
    cursor: pointer;
    /* cursor: n-resize; */
  }
  .count:hover {
    background: #474747;
  }
  .controls {
    flex: 0;
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  /* .count p {
    margin: 0;
    padding: 0;
  } */

  button {
    display: inline-flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
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
    opacity: 1;
    background: transparent;
    transition: transform 300ms var(--bezier), opacity 100ms var(--bezier),
      background 300ms var(--bezier);
    z-index: 2;
  }

  .save {
    background: rgba(43, 221, 104, 0.2);
    margin-left: 16px;
  }
  .delete {
    background: rgba(198, 75, 75, 0.2);
  }
  .cancel {
    background: rgba(255, 255, 255, 0.2);
  }
  .cancel img {
    opacity: 0.4;
  }

  .edit {
    opacity: 0.2;
    transition: opacity 200ms var(--bezier);
  }
  .edit:hover {
    opacity: 0.6;
  }

  button:disabled {
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
    margin: 0;
    border-radius: 4px;
    color: rgba(255, 255, 255, 1);
    transition: border-color 200ms var(--bezier), background 200ms var(--bezier);
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
  <div
    class="entry"
    in:fade={{ duration: 200, delay: 250 }}
    out:fade={{ duration: 150 }}>
    <input
      {id}
      disabled={!editing ? true : null}
      class="title-input"
      type="text"
      bind:value={title} />

    {#if !editing}
      <div class="count" on:click={increment}>
        <p>{count}</p>
      </div>
    {/if}
  </div>

  <div class="controls">
    <button class="edit" on:click={toggleEdit}>
      <img draggable="false" src="./images/icon-edit.svg" alt="edit icon" />
    </button>
    {#if editing}
      <button class="delete" on:click={deleteTally}>
        <img
          draggable="false"
          src="./images/icon-delete.svg"
          alt="delete icon" />
      </button>

      <button
        class="save"
        disabled={title.length > 0 ? null : true}
        on:click={updateTitle}>
        <img draggable="false" src="./images/icon-save.svg" alt="save icon" />
      </button>
    {/if}
  </div>

  <!--end controls -->
  <!-- end entry-->

</section>
