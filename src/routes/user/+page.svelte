<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center justify-center w-full h-full">
	<SignedIn let:user let:auth>
		<p><span class="font-bold">{user.displayName}</span>, you are logged in!</p>
		<Button on:click={() => auth.signOut().then(() => goto('/login'))}>Log Out</Button>
	</SignedIn>

	<SignedOut>
		You are not logged in.
		<Button href="/login">Login</Button>
	</SignedOut>
</div>
