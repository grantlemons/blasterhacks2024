<script lang="ts">
	import CameraModal from './cameraModal.svelte';
	import { Button } from 'flowbite-svelte';

	let showModal = false;

	async function openModal() {
		showModal = true;
	}
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<h1 class="text-2xl font-bold">StandUp</h1>
	<h2 class="text-xl">Stay fit.</h2>
	<Button on:click={openModal}>Take photo</Button>
	<CameraModal bind:showModal />
</div>
