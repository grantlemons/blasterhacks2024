<script lang="ts">
	import Feed from '$lib/Feed.svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import LoginModal from '$lib/loginModal.svelte';
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="w-fit flex flex-col gap-6 justify-center items-center sm:mx-2">
		<SignedOut>
			<LoginModal />
		</SignedOut>

		<div class="flex flex-col justify-center items-center">
			<h1 class="text-2xl font-bold">StandUp</h1>
			<h2 class="text-xl">Stay fit</h2>
		</div>

		<SignedIn>
			<Feed />
		</SignedIn>
	</div>
</div>
