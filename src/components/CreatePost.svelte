<script lang="ts">
  import { currentUser, pb } from "../ts/pocketbase";

  const createNewPost = async () => {
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("content", "asdasd");
    formData.append("user", $currentUser.id);
    const createdRecord = await pb.collection("posts").create(formData);
  };

  let fileInput: HTMLInputElement;
</script>

<div class="flex items-baseline gap-2">
  <p class="font-light text-lime-500">Create Post</p>
  <div class="h-[20%] flex-1 border border-x-0 border-b-0 border-lime-500" />
</div>
<textarea class="h-[200px] w-full" />
<div class="mt-2 flex items-center gap-4">
  <button on:click={createNewPost} class="px-4">Submit</button>
  <input type="file" bind:this={fileInput} />
</div>
