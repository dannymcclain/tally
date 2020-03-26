<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tallys } from "../stores.js";

  export let title;
  export let count;
  export let id;
  let editing = false;

  function toggleEdit() {
    editing = !editing;
  }
  function decrement() {
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
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
  }
  .entry {
    padding: 12px 24px 12px 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background: #151515;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1);
    width: 100%;
  }

  .count {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    flex: 1;
    max-width: 108px;
    justify-content: space-between;
  }

  .controls {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    /* transform: translateX(-96px);
    transition: transform 300ms var(--bezier); */
  }
  /* .controls-active {
    transform: translateX(0);
  } */
  .controls button {
    margin-left: 16px;
  }
  .count p {
    margin: 0;
    padding: 0;
    font-weight: bold;
  }
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
  button:hover {
    transform: scale(1.2);
  }
  .edit img {
    opacity: 0.2;
  }
  .edit {
    background: rgba(255, 255, 255, 0);
  }
  .edit:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .edit:hover img {
    opacity: 0.4;
  }
  .save {
    background: rgba(43, 221, 104, 0.2);
  }
  .delete {
    background: rgba(198, 75, 75, 0.2);
  }

  button:disabled {
    cursor: not-allowed;
  }
  input {
    flex: 2;
    background: #242424;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    padding: 8px;
    margin: 0;
    border-radius: 4px;
    cursor: text;
    color: rgba(255, 255, 255, 1);
    transition: border-color 200ms var(--bezier), background 200ms var(--bezier);
  }
  input:focus {
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
  input:disabled {
    border-color: transparent;
    background: transparent;
  }
  .hidden {
    /* opacity: 0;
    pointer-events: none;
    z-index: 1; */
    display: none;
  }
</style>

<section>
  <div class="entry" transition:fade={{ duration: 200, easing: cubicOut }}>
    <input
      disabled={editing ? null : 'true'}
      class="title-input"
      type="text"
      bind:value={title} />
    <div class="count">
      <button class={editing ? 'hidden minus' : 'minus'} on:click={decrement}>
        <img src="./images/icon-minus.svg" alt="minus icon" />
      </button>
      <p>{count}</p>
      <button class={editing ? 'hidden plus' : 'plus'} on:click={increment}>
        <img src="./images/icon-plus.svg" alt="plus icon" />
      </button>
    </div>
    <!-- end count -->
  </div>
  <!-- end entry-->
  <div class={!editing ? 'controls' : 'controls controls-active'}>
    <button
      class={!editing ? 'hidden delete' : 'delete'}
      on:click={deleteTally}>
      <img src="./images/icon-delete.svg" alt="delete icon" />
    </button>
    <button
      class={!editing ? 'hidden save' : 'save'}
      disabled={title.length > 0 ? null : true}
      on:click={updateTitle}>
      <img src="./images/icon-save.svg" alt="save icon" />
    </button>
    <button class={editing ? 'hidden edit' : 'edit'} on:click={toggleEdit}>
      <img src="./images/icon-edit.svg" alt="edit icon" />
    </button>

  </div>
  <!--end controls -->

</section>
