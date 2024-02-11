<script lang="ts">
	import Feed from '$lib/Feed.svelte';
	import { SignedIn, SignedOut } from 'sveltefire';
	import LoginModal from '$lib/loginModal.svelte';
import { Heading } from "flowbite-svelte";
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="w-fit flex flex-col gap-6 justify-center items-center sm:mx-2">
		<SignedOut>
			<LoginModal />
		</SignedOut>

		<div class="flex flex-col justify-center items-center">
			<Heading tag="h2" class="text-center mt-8">StandUp</Heading>
			<Heading tag="h4" class="text-center my-2">Stay fit</Heading>
		</div>

		<SignedIn>
			<Feed />
		</SignedIn>
	</div>
</div>
