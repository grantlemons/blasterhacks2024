<script lang="ts">
	import { goto } from "$app/navigation";
	import UserAvatar from "$lib/UserAvatar.svelte";
  import { friendsCollection } from "$lib/friends";
	import { publicUserDataCollection } from "$lib/publicUserData";
	import { doc } from "firebase/firestore";
	import { Card, Heading } from "flowbite-svelte";
	import { Doc, SignedIn } from "sveltefire";
</script>

<div class="flex flex-col items-center h-full p-4">
  <main class="w-full max-w-xl">
    <Heading tag="h2" class="text-center mt-6 mb-10">Friends</Heading>
    <div class="flex flex-col items-center">
      <SignedIn let:user>
        <Doc ref={doc(friendsCollection(), user.uid)} let:data>
          {#each data.friends as friendId}
            <Doc ref={doc(publicUserDataCollection(), friendId)} let:data>
              <div class="mt-4 transition-all hover:scale-[1.02] w-full grow">
                <Card class="flex flex-row items-center justify-between max-w-full sm:p-4" on:click={() => goto(`/user/${friendId}`)}>
                  <UserAvatar userId={friendId}/>
                  <h2 class="font-bold text-xl">{data.displayName}</h2>
                </Card>
              </div>
            </Doc>
          {/each}
        </Doc>
      </SignedIn>
    </div>
  </main>
</div>
