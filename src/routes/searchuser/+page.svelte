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
  <div class="flex flex-col items-center h-full">
    <div class="sm:w-[400px] h-full">
      <Search placeholder="Search for friends..." bind:value={search}/>
    
      <div class="[&>*]:mb-4">
          {#each results.entries() as [foundUserId, foundUser]}
            <a href={`/user/${foundUserId}`} class="mb-4">
              <Card class="transition-all hover:translate-x-2 flex flex-row items-center justify-between mb-4">
                <UserAvatar userId={foundUserId}/>
                <h2 class="font-bold text-lg">{foundUser.displayName}</h2>
              </Card>
            </a>
          {/each}
      </div>
    </div>
  </div>
</SignedIn>
