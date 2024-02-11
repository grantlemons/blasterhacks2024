<script lang="ts">
	import Circles from "./Circles.svelte";
	import type { WorkoutPost } from "./workoutPost";

  export let workouts: WorkoutPost[];
	export let width: string = '256px';
  
  $: filtered = workouts.filter(v => v.timestamp > Date.now() - 1000 * 60 * 60 * 24 * 7);
</script>

<Circles max={[70, 30 * 70 * 1000]} values={[filtered.length, 30 * 70 * 1000 - filtered.reduce((p, v) => p + v.timeSincePush, 0)]} {width}/>
