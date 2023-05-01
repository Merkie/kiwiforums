import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pburl = "https://defeated-camera.pockethost.io";
export const pb = new PocketBase(pburl);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth);
  currentUser.set(pb.authStore.model);
});
