<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import CreatePost from "./CreatePost.svelte";
  import Post from "./Post.svelte";
  import { pb, pburl } from "../ts/pocketbase";

  let unsubscribe: () => void;
  let posts = [];

  onMount(async () => {
    const resultList = await pb.collection("posts").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    posts = resultList.items;

    unsubscribe = await pb
      .collection("posts")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          posts = [record, ...posts];
        }
        if (action === "delete") {
          posts = posts.filter((message) => message.id !== record.id);
        }
      });
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- <h2 class="text-2xl">3Kiwi</h2> -->
<CreatePost />
{#each posts as post}
  <Post {post} />
{/each}
