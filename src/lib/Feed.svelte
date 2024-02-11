<script lang="ts">
	import SortedFeed from './SortedFeed.svelte';
	import { workoutCollection } from '$lib/workoutPost';
	import { query, where } from 'firebase/firestore';
	import { Collection, Doc, SignedIn } from 'sveltefire';
	import { getFriends } from './friends';
</script>

<SignedIn let:user>
  <div class="w-full flex flex-col items-center gap-4">
    <Doc ref={`friends/${user.uid}`} let:data>
        <p slot="loading" class="text-center"><em>You don't have any StandUp friends yet. <br/><a href="/searchuser">Go find some!</a></em></p>

      {#if data == null || data.friends.length == 0}
        <p class="text-center"><em>You don't have any StandUp friends yet. <br/><a href="/searchuser">Go find some!</a></em></p>
      {:else}
  	    <Collection ref={query(workoutCollection(), where("userId", 'in', data.friends))} let:data>
			    <SortedFeed {data} />
  	    </Collection>
      {/if}
    </Doc>
  </div>
</SignedIn>
