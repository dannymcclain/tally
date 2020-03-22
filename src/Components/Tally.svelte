<script>
  import { tallys } from "../stores.js";
  export let title;
  export let count;
  export let id;

  function deincrement() {
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
      console.log(entry.id, tallyId);
      return entry.id != tallyId;
    });
    tallys.update(current => UpdatedTallyList);
    localStorage.setItem("tallys", JSON.stringify($tallys));
  }
</script>

<style>
  section {
    padding: 12px 20px;
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
  }
  .count {
    font-weight: bold;
  }
  .controls,
  .title {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
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
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: background 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  button:hover {
    background: rgba(255, 255, 255, 1);
  }
</style>

<section>
  <div class="title">
    <button on:click={deleteTally}>Delete</button>
    <p class="title">{title}</p>
  </div>
  <div class="controls">
    <button on:click={deincrement}>
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
</section>
