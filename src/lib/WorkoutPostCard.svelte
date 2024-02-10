<script lang="ts">
	import { getFirestore } from 'firebase/firestore';
	import { Card, Spinner } from 'flowbite-svelte';
	import { docStore } from 'sveltefire';
	import type { WorkoutPost } from './workoutPost';
	import { startCase } from 'lodash-es';
	import type { PublicUserData } from './publicUserData';
	import UserAvatar from './UserAvatar.svelte';
	import humanizeTime from './humanizeTime';
	import { onDestroy, onMount } from 'svelte';

	export let workoutId: string;

	let exists = true;
	let timestring = 'seconds ago';

	const workout = docStore<WorkoutPost>(getFirestore(), `workouts/${workoutId}`);
	$: user =
		$workout != null
			? docStore<PublicUserData>(getFirestore(), `publicUserData/${$workout.userId}`)
			: null;
	$: workout && updateString();

	function updateString() {
		if ($workout != null) timestring = humanizeTime($workout.timestamp);
		if (exists) setTimeout(updateString, 1000);
	}

	onMount(() => {
		updateString();
	});

	onDestroy(() => {
		exists = false;
	});
</script>

<Card class="bg-grey-100 dark:bg-grey-700 hover:scale-[1.02] transition-all">
	{#if $workout != null && $user != null}
		<div class="flex flex-row items-center w-full [&>*]:p-1">
			<UserAvatar userId={$workout.userId} />
			<h2 class="font-bold">{$user.displayName}</h2>
			<div class="flex-auto" />
			<h2 class="font-bold">{startCase($workout.kind)}</h2>
		</div>
		<img src="/lukas.jpg" class="rounded" alt="Lukas Werner" />
		<p>{$workout.description}</p>
		<p><em>{timestring}</em></p>
	{:else}
		<Spinner />
	{/if}
</Card>
