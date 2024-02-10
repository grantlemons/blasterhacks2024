<script lang="ts">
	import { goto } from "$app/navigation";
	import UserAvatar from "$lib/UserAvatar.svelte";
  import { friendsCollection } from "$lib/friends";
	import { publicUserDataCollection } from "$lib/publicUserData";
	import { doc } from "firebase/firestore";
	import { Card } from "flowbite-svelte";
	import { Doc, SignedIn } from "sveltefire";
</script>

<h1 class="text-3xl font-bold text-center h-10">Friends</h1>
<div class="flex flex-col items-center">
  <SignedIn let:user>
    <Doc ref={doc(friendsCollection(), user.uid)} let:data>
      {#each data.friends as friendId}
        <Doc ref={doc(publicUserDataCollection(), friendId)} let:data>
          <div class="mb-4 transition-all hover:scale-[1.02] w-[400px]">
            <Card class="flex flex-row items-center justify-between w-full" on:click={() => goto(`/user/${friendId}`)}>
              <UserAvatar userId={friendId}/>
              <h2 class="font-bold text-xl">{data.displayName}</h2>
            </Card> 
          </div>
        </Doc>
      {/each}
    </Doc>
  </SignedIn>
</div>
