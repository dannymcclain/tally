<script>
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tallys } from "../stores.js";

  export let title;
  export let count;
  export let id;
  let editing = false;

  function toggleEdit() {
    title.length > 0 ? console.log(">0") : console.log("<0");
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
    padding: 10px 20px 10px 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 24px;
  }

  .count {
    font-weight: bold;
  }
  .controls,
  .title {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  .title {
    flex: 2;
    justify-content: flex-start;
  }
  .delete {
    margin-right: 12px;
    background: transparent;
    opacity: 0.2;
    transition: opacity 300ms var(--bezier);
  }
  section:hover .delete:hover {
    background: transparent;
    opacity: 1;
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
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    transition: background 300ms var(--bezier);
  }
  button:hover {
    background: rgba(255, 255, 255, 1);
  }
  input {
    flex: 2;
    background: rgba(255, 255, 255, 0.16);
    outline: none;
    border: none;
    padding: 13px 0;
    margin: 0 16px 0 0;
    cursor: text;
    color: rgba(255, 255, 255, 1);
  }
  .reg-btn {
    height: auto;
    width: auto;
    background: #333;
    color: #fff;
    border-radius: 4px;
    padding: 4px;
    font-size: 12px;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>

<section transition:fade={{ duration: 200, easing: cubicOut }}>
  {#if !editing}
    <p>{title}</p>
    <button class="reg-btn" on:click={toggleEdit}>Edit</button>
    <div class="controls">
      <button on:click={decrement}>
        <svg
          width="12"
          height="2"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1H11"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <p class="count">{count}</p>
      <button on:click={increment}>
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
    </div>
  {:else}
    <button class="reg-btn" on:click={deleteTally}>Delete</button>
    <input class="title-input" type="text" bind:value={title} />
    <button
      class="reg-btn"
      disabled={title.length > 0 ? null : true}
      on:click={updateTitle}>
      Save
    </button>
  {/if}

  <!-- <div class="title">
    <button class="delete" on:click={deleteTally}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 5H15L14.1528 15.1661C14.0664 16.2027 13.1999 17 12.1597
          17H5.84027C4.80009 17 3.93356 16.2027 3.84717 15.1661L3 5Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M1 5H17"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M5 3C5 1.89543 5.89543 1 7 1H11C12.1046 1 13 1.89543 13 3V5H5V3Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>

    </button>
    <input
      class="title-input"
      type="text"
      bind:value={title}
      on:input={updateTitle} />
  </div>
  <div class="controls">
    <button on:click={decrement}>
      <svg
        width="12"
        height="2"
        viewBox="0 0 12 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1H11"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
    <p class="count">{count}</p>
    <button on:click={increment}>
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
  </div> -->
</section>
