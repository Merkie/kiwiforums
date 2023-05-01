<script lang="ts">
  import { currentUser, pb } from "../ts/pocketbase";

  let username: string;
  let password: string;
  let passwordConfirm: string;

  const login = async () => {
    try {
      await pb.collection("users").authWithPassword(username, password);
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  const register = async () => {
    const data = {
      username,
      password,
      passwordConfirm,
    };

    try {
      const createUser = await pb.collection("users").create(data);
    } catch (err) {
      alert(err.message);
      return;
    }

    await login();
  };

  const logout = async () => {
    pb.authStore.clear();
  };
</script>

<div class="grid flex-1 place-items-center">
  <div class="flex w-full max-w-[500px] flex-col gap-1">
    <p class="mb-4 text-xl">Register for 3Kiwi</p>
    <input placeholder="username" type="text" bind:value={username} />
    <input placeholder="password" type="password" bind:value={password} />
    <input
      placeholder="confirm password"
      type="password"
      bind:value={passwordConfirm}
    />
    <button on:click={register}>Submit</button>
    <a class="mt-2 text-sm underline" href="/login">Already have an account?</a>
    <!-- <button on:click={signup}>Signup</button> -->
  </div>
</div>
