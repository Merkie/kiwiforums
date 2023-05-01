<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser, pb } from '../ts/pocketbase';
  
  let messages = [];
  let newMessage = '';
  let unsubscribe: () => void;

  onMount(async () => {
    const resultList = await pb.collection('messages').getList(1,50, {
      sort: 'created',
      expand: 'user'
    });
    messages = resultList.items;

    unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
      if (action === 'create') {
        const user = await pb.collection('users').getOne(record.user);
        record.expand = { user };
        messages = [...messages, record];
      }
      if (action === 'delete') {
        messages = messages.filter(message => message.id !== record.id);
      }
    })
  })

  onDestroy(() => {
    unsubscribe();
  })

  const sendMessage = async () => {
    const data = {
      text: newMessage,
      user: $currentUser.id
    }
    const createdMessage = await pb.collection('messages').create(data);
  }
</script>

{#each messages as message (message.id)}   
  <p>{`${message.expand?.user?.username}: ${message.text}`}</p>
{/each}
<input type="text" bind:value={newMessage}><button on:click={sendMessage}>Send Message</button>