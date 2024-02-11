<script lang="ts">
	import { SignedIn } from 'sveltefire';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { getAuth } from 'firebase/auth';

	let auth = getAuth();
	if (auth.currentUser == null) {
		goto('/');
	}
</script>

<div class="flex flex-col items-center justify-center w-full h-full">
	<SignedIn let:user let:auth>
		<p><span class="font-bold">{user.displayName}</span>, you are logged in!</p>
		<Button on:click={() => auth.signOut().then(() => goto('/'))}>Log Out</Button>
	</SignedIn>
</div>
