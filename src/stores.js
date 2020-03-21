import { writable } from "svelte/store";

export const testObj = writable([
  { title: "red", count: 0, uid: 1 },
  { title: "blue", count: 4, uid: 2 },
  { title: "green", count: 9, uid: 3 },
  { title: "yellow", count: 2, uid: 4 }
]);
