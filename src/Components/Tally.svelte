<script>
  import { fade } from "svelte/transition";
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
    font-weight: bold;
  }
  .controls {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .controls {
    flex: 1;
    max-width: 108px;
    justify-content: space-between;
  }
  .controls p {
    margin: 0;
    padding: 0;
  }
  button {
    display: inline-flex;
    width: 32px;
    height: 32px;
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
    transition: background 300ms var(--bezier);
    position: relative;
  }
  button svg {
    z-index: 2;
    opacity: 0.2;
    transition: opacity 350ms var(--bezier);
  }
  button .btn-bg {
    z-index: 1;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0);
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 32px;
    width: 32px;
    transform: scale(1);
    transition: transform 350ms var(--bezier), background 350ms var(--bezier);
  }
  button:hover svg {
    opacity: 0.4;
  }
  button:hover .btn-bg {
    transform: scale(1.25);
    background: rgba(255, 255, 255, 0.2);
  }
  button:disabled {
    cursor: not-allowed;
  }
  .edit {
    margin-left: 16px;
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
    <div class="controls">

      <button class={editing ? 'hidden' : ''} on:click={decrement}>
        <svg
          width="12"
          height="2"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1H11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <p class="count">{count}</p>
      <button class={editing ? 'hidden' : ''} on:click={increment}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.00056 1V11M1 6.00007H11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>

    </div>

  </div>
  <button
    class={!editing ? 'hidden' : ''}
    disabled={title.length > 0 ? null : true}
    on:click={updateTitle}>
    Save
  </button>
  <button class={!editing ? 'hidden' : ''} on:click={deleteTally}>
    Delete
  </button>
  <button class={editing ? 'hidden' : 'edit'} on:click={toggleEdit}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 3.50006L10.5 7.50006M1 9.00006V13.0001H5L12 6.00006C13.1046
        4.89549 13.1046 3.10463 12 2.00006C10.8954 0.895488 9.10457 0.895489 8
        2.00006L1 9.00006Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
    <span class="btn-bg" />
  </button>
</section>
