<script lang="ts">
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import { getMessaging, getToken } from 'firebase/messaging';
	import '../app.css';
	import { getFirestore } from 'firebase/firestore';
	import { Button, DarkMode } from 'flowbite-svelte';

	const appName = 'BeFit';

	const firebaseConfig = {
		apiKey: 'AIzaSyCjUnR1Eydjr3qxouIl4fxiXyQvG2auUj8',
		authDomain: 'neovim-btw.firebaseapp.com',
		projectId: 'neovim-btw',
		storageBucket: 'neovim-btw.appspot.com',
		messagingSenderId: '930780589668',
		appId: '1:930780589668:web:6472e046a1bddfa5b0f971'
	};

	function requestPermission() {
		console.log('Requesting permission...');
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('Notification permission granted.');
			}
		});
	}

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const messaging = getMessaging(app);
	getToken(messaging, {
		vapidKey:
			'BGK8g4omXiFrAHqvsH70r1r6CqAT-lmXQm5wYY7W6AqC1_PS1gNSBZj2ciVCGbC8BYrIUKH_nwlq-Ad55DI8wuY'
	});
</script>

<FirebaseApp {auth} {firestore}>
	<div class="flex flex-col w-full h-screen dark:bg-gray-800 dark:text-white">
		<div class="w-full bg-primary-600 h-20 flex flex-row items-center p-5">
			<a href="/"><h2 class="text-white font-bold text-lg">StandUp</h2></a>
			<div class="flex-auto" />
			<SignedIn let:user>
				<Button href="/user">{user.displayName}</Button>
			</SignedIn>
			<SignedOut>
				<Button href="/login" on:click={requestPermission}>Login</Button>
			</SignedOut>
			<DarkMode btnClass="w-5" />
		</div>
		<div class="flex-auto">
			<slot />
		</div>
	</div>
</FirebaseApp>
