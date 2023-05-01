<script lang="ts">
  import Home from "./components/Home.svelte";
  import Login from "./components/Login.svelte";
  import Register from "./components/Register.svelte";

  let path: string;

  $: path = window.location.pathname;
</script>

<main
  class="h-screen w-screen bg-gradient-to-b from-lime-200 to-lime-400 text-lime-800"
>
  <div
    class="mx-auto flex h-full w-[90%] max-w-[1000px] flex-col border border-y-0 border-lime-300 bg-lime-100 p-4"
  >
    {#if path === "/"}
      <Home />
    {:else if path === "/login"}
      <Login />
    {:else if path === "/register"}
      <Register />
    {/if}
  </div>
</main>
