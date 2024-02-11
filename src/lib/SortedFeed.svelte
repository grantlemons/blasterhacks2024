<script>
	import WorkoutPostCard from '$lib/WorkoutPostCard.svelte';
	export let data;
	$: sorted = data.sort((a,b)=>{
		return b.timestamp - a.timestamp;
	});
</script>

<div class="px-4 pb-16 gap-4">
  {#each sorted as post}
    <WorkoutPostCard workoutId={post.id} />
  {/each}
</div>
