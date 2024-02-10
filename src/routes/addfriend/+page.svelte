<script lang="ts">
	import { Button, Card, Search } from "flowbite-svelte";
  import { searchForUser, type PublicUserData } from "$lib/publicUserData"
  import { addFriend } from "$lib/friends"
	import { Doc, SignedIn } from "sveltefire";
	import { getAuth } from "firebase/auth";

  let results: Map<string, PublicUserData> = new Map();
  let search = "";

  $: searchForUser(search).then((r) => results = r);

  let selectedUserId: null | string = null;

  function filterUsers(friends: string[], results: Map<string, PublicUserData>) {
      return [...results.entries()].filter(([foundUserId, foundUser]) => !friends.includes(foundUserId) && foundUserId != getAuth().currentUser?.uid);
  }
</script>

<SignedIn let:user>
  <div class="flex flex-col items-center h-full">
    <div class="sm:w-[400px] h-full">
      <Search placeholder="Search for friends..." bind:value={search}/>
    
      <div class="[&>*]:mb-4">
        <Doc ref={`friends/${user.uid}`} let:data>
          <script lang="ts">
          </script>

          {#each filterUsers(data.friends, results) as [foundUserId, foundUser]}
              <Card class="transition-all hover:translate-x-2" on:click={() => selectedUserId = foundUserId}>
                <h2 class="font-bold text-lg">{foundUser.displayName}</h2>
              </Card>
              <div class={`${selectedUserId === foundUserId ? "h-14 p-3": "h-0 p-0"} transition-all overflow-hidden flex flex-row justify-center`}>
                <Button class="w-2/3" on:click={() => addFriend(foundUserId)}>Add Friend</Button>
              </div>
          {/each}

          {#if filterUsers(data.friends, results).length == 0}
            <p><em>No results found.</em></p> 
          {/if}
        </Doc>
      </div>
    </div>
  </div>
</SignedIn>
