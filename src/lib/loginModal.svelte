<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
	import * as firebaseui from 'firebaseui';
	import 'firebaseui/dist/firebaseui.css';
	import { onDestroy, onMount } from 'svelte';

	let ui: firebaseui.auth.AuthUI | undefined;
	let auth: Auth;

	onMount(async () => {
		auth = getAuth();

		await auth.authStateReady();

		var uiConfig = {
			signInOptions: [GoogleAuthProvider.PROVIDER_ID],
			signInFlow: 'popup'
		};

		ui = new firebaseui.auth.AuthUI(auth);
		ui.start('#firebaseui-auth-container', uiConfig);
	});

	onDestroy(() => {
		if (ui) ui.delete();
	});
</script>

<Modal open={auth != null && auth.currentUser == null} placement="center" class="dark:bg-grey-600">
	<div class="flex flex-col content-center w-full self-center">
		<div id="firebaseui-auth-container" class="w-full"></div>
	</div>
</Modal>
