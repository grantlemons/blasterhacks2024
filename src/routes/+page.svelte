<script lang="ts">
	import Feed from '$lib/Feed.svelte';
	import { SignedIn } from 'sveltefire';
import CameraModal from './cameraModal.svelte';
	import { Button } from 'flowbite-svelte';

	let showModal = false;

	async function openModal() {
		showModal = true;
	}
</script>

<div class="w-full h-1/3 flex flex-col space-y-6 justify-center items-center">
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-2xl font-bold">StandUp</h1>
		<h2 class="text-xl">Stay fit.</h2>
	</div>
	<Button class="w-80" on:click={openModal}>Take Photo</Button>
	<CameraModal bind:showModal />
</div>

<SignedIn>
  <Feed/>
</SignedIn>
