<script lang="ts">
	import { Card, Search } from "flowbite-svelte";
  import { searchForUser, type PublicUserData } from "$lib/publicUserData"
	import { Doc, SignedIn } from "sveltefire";
	import UserAvatar from "$lib/UserAvatar.svelte";

  let results: Map<string, PublicUserData> = new Map();
  let search = "";

  $: searchForUser(search).then((r) => results = r);
</script>

<SignedIn let:user>
  <div class="flex flex-col items-center h-full p-4">
    <div class="w-full max-w-xl h-full">
      <Search placeholder="Search for friends..." bind:value={search} class="mb-4"/>
    
      <div class="[&>*]:mb-4">
          {#each results.entries() as [foundUserId, foundUser]}
            <a class="block mb-4" href={`/user/${foundUserId}`}>
              <Card class="max-w-full sm:p-4 transition-all hover:translate-x-2 flex flex-row items-center justify-between">
                <UserAvatar userId={foundUserId}/>
                <h2 class="font-bold text-lg">{foundUser.displayName}</h2>
              </Card>
            </a>
          {/each}
      </div>
    </div>
  </div>
</SignedIn>
