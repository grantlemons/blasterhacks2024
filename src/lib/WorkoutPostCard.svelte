<script lang="ts">
	import { getFirestore } from 'firebase/firestore';
	import { getStorage, ref, getDownloadURL } from 'firebase/storage';
	import { Card, Spinner } from 'flowbite-svelte';
	import { docStore } from 'sveltefire';
	import type { WorkoutPost } from './workoutPost';
	import { startCase } from 'lodash-es';
	import type { PublicUserData } from './publicUserData';
	import UserAvatar from './UserAvatar.svelte';
	import humanizeTime from './humanizeTime';
	import { onDestroy, onMount } from 'svelte';

	export let workoutId: string;
	const storage = getStorage(); // create a root reference

	let exists = true;
	let timestring = 'seconds ago';

	const workout = docStore<WorkoutPost>(getFirestore(), `workouts/${workoutId}`);
	$: user =
		$workout != null
			? docStore<PublicUserData>(getFirestore(), `publicUserData/${$workout.userId}`)
			: null;
	$: workout && updateString();

	function setimgsrc(img) {
		if ($workout != null && $workout.imagePath != null) {
			getDownloadURL(ref(storage, $workout.imagePath))
				.then((url) => {
					img.src = url;
				})
				.catch((error) => {
					console.log('There was an error when fetching the image from the database:', error);
				});
		}
	}

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

<Card class="hover:scale-[1.02] transition-all bg-gray-100 dark:bg-gray-700">
	{#if $workout != null && $user != null}
		<div class="flex flex-row items-center w-full [&>*]:p-1">
			<UserAvatar userId={$workout.userId} />
			<h2 class="font-bold">{$user.displayName}</h2>
			<div class="flex-auto" />
			<h2 class="font-bold">{startCase($workout.kind)}</h2>
		</div>
		<img src="/lukas.jpg" class="rounded" />
		<p>{$workout.description}</p>
		<p><em>{timestring}</em></p>
	{:else}
		<Spinner />
	{/if}
</Card>
