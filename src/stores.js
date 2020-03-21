import { writable } from "svelte/store";

export const testObj = writable([
  { title: "red", count: 1, uid: 1 },
  { title: "blue", count: 2, uid: 2 },
  { title: "green", count: 3, uid: 3 },
  { title: "yellow", count: 4, uid: 4 }
]);
