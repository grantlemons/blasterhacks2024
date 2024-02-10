<script lang="ts">
	import { Button, Input, Label, Select } from 'flowbite-svelte';
	import { allWorkoutKinds, insertWorkoutPost, type WorkoutKind } from '$lib/workoutPost';
	import { startCase } from 'lodash-es';
	import WorkoutPostCard from '$lib/WorkoutPostCard.svelte';

	let kind = 'pushups';
	let description = '';

	let createdId: null | string = null;

	// This is just a development form for creating workout posts.
	function onSubmit(e: SubmitEvent) {
		e.preventDefault();

		insertWorkoutPost(kind as WorkoutKind, description).then((newId) => (createdId = newId));
	}
</script>

<div class="flex flex-col justify-center items-center">
	<form on:submit={onSubmit} class="w-full sm:w-72 [&>*]:pt-4">
		<Label>Workout Kind</Label>
		<Select bind:value={kind}>
			{#each allWorkoutKinds as kind}
				<option value={kind}>{startCase(kind)}</option>
			{/each}
		</Select>
		<Label>Description</Label>
		<Input type="text" bind:value={description} />
		<Button type="submit" class="w-full">Submit</Button>
	</form>

	{#if createdId != null}
		<WorkoutPostCard workoutId={createdId} />
	{/if}
</div>
