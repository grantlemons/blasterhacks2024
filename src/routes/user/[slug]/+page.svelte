<script lang="ts">
	import Circles from "$lib/Circles.svelte";
import UserAvatar from "$lib/UserAvatar.svelte";
	import { isFriend, addFriend, removeFriend } from "$lib/friends";
	import { publicUserDataCollection } from "$lib/publicUserData";
	import { doc } from "firebase/firestore";
	import { Button, Card, Spinner } from "flowbite-svelte";
	import { size } from "lodash-es";
	import { Doc, SignedIn } from "sveltefire";

  export let data; 
  let pageData = data;

  let avatarContainer;
</script>

<div class="absolute w-screen">
  <div class="flex flex-row justify-center mt-[142.5px]" bind:this={avatarContainer}>
      <UserAvatar userId={pageData.slug} size={"100px"}/>
  </div>
</div>

<SignedIn let:user>
  <div class="flex flex-col items-center h-full">
    <Card class="w-[400px] h-full p-0">
      <Doc ref={doc(publicUserDataCollection(), data.slug)} let:data>
        <Doc ref={`friends/${user.uid}`} let:data={s}>
          <Circles max={[100, 100, 100]} values={[10, 40, 80]} width="100%"/>
  
          <div class="flex flex-col justify-center items-center">
            <h1 class="text-2xl font-bold">{data.displayName}</h1>
  
            {#if s.friends.includes(pageData.slug)}
              <Button on:click={() => removeFriend(pageData.slug)}>Unfriend</Button>
            {:else}
              <Button on:click={() => addFriend(pageData.slug)}>Friend</Button>
            {/if}
          </div>
          <Spinner slot="loading"></Spinner>
        </Doc>
      </Doc>
    </Card>
  </div>
</SignedIn>
