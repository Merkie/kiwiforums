<script lang="ts">
  import { pburl } from "../ts/pocketbase";
  export let post: any;

  let imageFullRes = false;

  const dateToReadableTime = (date: string) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return `${hours}:${minutes}`;
  };
</script>

<div class="border border-x-0 border-t-0 border-lime-300 py-8">
  <img
    on:click={() => (imageFullRes = !imageFullRes)}
    on:keypress={() => (imageFullRes = !imageFullRes)}
    src={`${pburl}/api/files/${post.collectionId}/${post.id}/${post.image}`}
    alt=""
    class={`float-left inline cursor-pointer p-2 pl-0 ${
      imageFullRes ? "w-full" : "w-[200px]"
    }`}
  />
  <p class="inline">
    <span class="text-lime-500">{post.id}</span>{" • "}
    Posted by <span class="font-bold">{post.expand.user.username}</span> at
    <span class="font-bold">{dateToReadableTime(post.created)}</span><br />
    {post.content}
  </p>
</div>
