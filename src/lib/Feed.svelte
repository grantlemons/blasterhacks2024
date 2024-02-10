<script lang="ts">
	import WorkoutPostCard from "$lib/WorkoutPostCard.svelte";
  import { workoutCollection } from "$lib/workoutPost";
	import { Collection } from "sveltefire";
</script>


<div class="w-full flex flex-col items-center [&>*]:mb-5">
  <Collection ref={workoutCollection()} let:data>
    {#each data as post}
      <WorkoutPostCard workoutId={post.id}/>
    {/each}
  </Collection>
</div>
