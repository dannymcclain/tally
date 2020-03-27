<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { backOut } from "svelte/easing";
  import { tallys } from "../stores.js";
  import { tweened } from "svelte/motion";

  function toggleEdit() {
    editing = !editing;
  }

  export let title;
  export let count;
  export let id;
  export let editing = false;

  let transitionIn = {
    y: -50,
    duration: 275,
    easing: backOut,
    delay: 275
  };
  let transitionOut = { x: -50, duration: 225, easing: cubicOut };

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
</script>

<style>
  section {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 24px;
    padding: 12px 16px 12px 12px;
    background: #151515;
    border-radius: 4px;
    overflow: hidden;
  }
  .entry {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1);
    width: 100%;
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
    flex: 1;
    /* width: 96px; */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
  }
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

  .save {
    background: rgba(43, 221, 104, 0.2);
  }
  .delete {
    background: rgba(198, 75, 75, 0.2);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  input {
    background: #242424;
    border: 2px solid rgba(255, 255, 255, 0.2);
    flex: 2;
    min-width: 0;
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
  {#if !editing}
    <div class="entry" in:fly={transitionIn} out:fly={transitionOut}>
      <input {id} disabled class="title-input" type="text" bind:value={title} />

      <div class="count">
        <button class="minus" on:click={decrement}>
          <img src="./images/icon-minus.svg" alt="minus icon" />
        </button>
        <p>{count}</p>
        <button class="plus" on:click={increment}>
          <img src="./images/icon-plus.svg" alt="plus icon" />
        </button>
      </div>
      <!-- end count -->
      <div class="controls">
        <button on:click={toggleEdit}>
          <img src="./images/icon-edit.svg" alt="edit icon" />
        </button>
      </div>
      <!--end controls -->
    </div>
    <!-- end entry-->
  {:else}
    <div class="entry" in:fly={transitionIn} out:fly={transitionOut}>
      <input {id} class="title-input" type="text" bind:value={title} />

      <div class="count">
        <input disabled bind:value={count} />
      </div>
      <!-- end count -->
      <div class="controls">
        <button class="delete" on:click={deleteTally}>
          <img src="./images/icon-delete.svg" alt="delete icon" />
        </button>
        <button
          class="save"
          disabled={title.length > 0 ? null : true}
          on:click={updateTitle}>
          <img src="./images/icon-save.svg" alt="save icon" />
        </button>
      </div>
      <!--end controls -->
    </div>
    <!-- end entry-->
  {/if}
</section>
