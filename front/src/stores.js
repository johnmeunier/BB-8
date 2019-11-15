import { writable } from "svelte/store";

export const user = writable({
  name: "John",
  surname: "JN-2",
  color: "red"
});

export const droid = writable({
  isHyperspace: false
})