<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tallys } from "../stores.js";

  export let title;
  export let count;
  export let id;
  let editing = false;

  let buttonTransitionIn = {
    y: 40,
    duration: 300,
    easing: cubicOut,
    delay: 50
  };
  let buttonTransitionOut = { y: -20, duration: 200, easing: cubicOut };

  function toggleEdit(el) {
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
    width: 85%;
  }

  .count {
    flex: 1;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    max-width: 92px;
    justify-content: space-between;
  }

  .controls {
    width: 15%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  .controls button {
    margin-left: 16px;
  }
  .controls .save {
    position: absolute;
    right: 48px;
  }
  .controls .delete {
    position: absolute;
    right: 0;
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
  .edit img {
    /* opacity: 0.2; */
    opacity: 0.4;
    transition: opacity 200ms var(--bezier);
  }
  .edit {
    background: rgba(255, 255, 255, 0);
  }
  /* .edit:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  */
  .edit:hover img {
    opacity: 0.6;
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
</style>

<section>
  <div class="entry" transition:fade={{ duration: 200, easing: cubicOut }}>
    <input
      {id}
      disabled={editing ? null : 'true'}
      class="title-input"
      type="text"
      bind:value={title} />
    <div class="count">
      {#if !editing}
        <button
          in:fly={buttonTransitionIn}
          out:fly={{ buttonTransitionOut }}
          class="minus"
          on:click={decrement}>
          <img src="./images/icon-minus.svg" alt="minus icon" />
        </button>
      {/if}
      <p>{count}</p>
      {#if !editing}
        <button
          in:fly={buttonTransitionIn}
          out:fly={{ buttonTransitionOut }}
          class="plus"
          on:click={increment}>
          <img src="./images/icon-plus.svg" alt="plus icon" />
        </button>
      {/if}
    </div>
    <!-- end count -->
  </div>
  <!-- end entry-->

  <div class="controls">
    {#if editing}
      <button
        in:fly={buttonTransitionIn}
        out:fly={{ buttonTransitionOut }}
        class="delete"
        on:click={deleteTally}>
        <img src="./images/icon-delete.svg" alt="delete icon" />
      </button>
      <button
        in:fly={buttonTransitionIn}
        out:fly={{ buttonTransitionOut }}
        class="save"
        disabled={title.length > 0 ? null : true}
        on:click={updateTitle}>
        <img src="./images/icon-save.svg" alt="save icon" />
      </button>
    {:else}
      <button
        in:fly={buttonTransitionIn}
        out:fly={{ buttonTransitionOut }}
        class="edit"
        on:click={toggleEdit}>

        <img src="./images/icon-edit.svg" alt="edit icon" />
      </button>
    {/if}
  </div>
  <!--end controls -->
</section>
