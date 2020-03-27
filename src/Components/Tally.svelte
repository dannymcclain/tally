<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tallys } from "../stores.js";
  import { tweened } from "svelte/motion";

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
  function oldTitle() {
    let oldTitle;
    let currentTallys = Array.from($tallys);
    currentTallys.forEach(function(entry) {
      if (entry.id === id) {
        oldTitle = entry.title;
      }
    });
    title = oldTitle;
    editing = false;
  }
  function inputBlur() {
    if (title.length === 0) {
      oldTitle();
    } else {
      updateTitle();
    }
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
    flex: 2;
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
    flex: 0;
    width: 96px;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  .controls button {
    margin-left: 16px;
  }
  /* .controls .save {
    position: absolute;
    right: 48px;
  }
  .controls .delete {
    position: absolute;
    right: 0;
  } */
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

  .save {
    background: rgba(43, 221, 104, 0.2);
  }
  .delete {
    background: rgba(198, 75, 75, 0.2);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
  input {
    background: #242424;
    border: 2px solid rgba(255, 255, 255, 0.2);
    flex: 2;
    outline: none;
    padding: 8px;
    margin: 0;
    border-radius: 4px;
    cursor: text;
    color: rgba(255, 255, 255, 1);
    transition: border-color 200ms var(--bezier), background 200ms var(--bezier);
  }
  input:focus {
    background: #242424;
    border: 2px solid rgba(255, 255, 255, 0.6);
  }
  input:disabled {
    background: transparent;
    border: 2px solid transparent;
  }
</style>

<section>
  <div class="entry" transition:fade={{ duration: 200, easing: cubicOut }}>
    <input
      {id}
      disabled={!editing ? 'true' : null}
      class="title-input"
      type="text"
      bind:value={title} />
    {#if !editing}
      <button on:click={() => (editing = true)}>edit</button>
    {/if}
    <div class="count">

      <button
        disabled={editing ? true : null}
        in:fly={buttonTransitionIn}
        out:fly={{ buttonTransitionOut }}
        class="minus"
        on:click={decrement}>
        <img src="./images/icon-minus.svg" alt="minus icon" />
      </button>

      <p>{count}</p>

      <button
        disabled={editing ? true : null}
        in:fly={buttonTransitionIn}
        out:fly={{ buttonTransitionOut }}
        class="plus"
        on:click={increment}>
        <img src="./images/icon-plus.svg" alt="plus icon" />
      </button>

    </div>
    <!-- end count -->
  </div>
  <!-- end entry-->
  {#if editing}
    <div class="controls">
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
    </div>
  {/if}
  <!--end controls -->
</section>
