<script lang="ts">
	import Circles from "$lib/Circles.svelte";
	import InformedCircles from "$lib/InformedCircles.svelte";
  import UserAvatar from "$lib/UserAvatar.svelte";
	import { addFriend, removeFriend } from "$lib/friends";
	import { publicUserDataCollection } from "$lib/publicUserData";
	import { workoutCollection } from "$lib/workoutPost.js";
	import { doc, query, where } from "firebase/firestore";
	import { Button, Card } from "flowbite-svelte";
	import { Collection, Doc, SignedIn } from "sveltefire";

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
        <Collection ref={query(workoutCollection(), where('userId', '==', pageData.slug))} let:data={docs}>
          <InformedCircles workouts={docs} width="100%"/>
  
          <div class="flex flex-col justify-center items-center">
            <h1 class="text-2xl font-bold">{data.displayName}</h1>
  
            <Doc ref={`friends/${user.uid}`} let:data={s}>
              {#if s.friends.includes(pageData.slug)}
                <Button on:click={() => removeFriend(pageData.slug)}>Unfriend</Button>
              {:else}
                <Button on:click={() => addFriend(pageData.slug)}>Friend</Button>
              {/if}

              <Button slot="loading" on:click={() => addFriend(pageData.slug)}>Friend</Button>
            </Doc>
          </div>
        </Collection>
      </Doc>
    </Card>
  </div>
</SignedIn>
