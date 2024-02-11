<script>
	import WorkoutPostCard from '$lib/WorkoutPostCard.svelte';
	export let data;
	$: sorted = data.sort((a,b)=>{
		return b.timestamp - a.timestamp;
	});
</script>

{#each sorted as post}
	<WorkoutPostCard workoutId={post.id} />
{/each}
