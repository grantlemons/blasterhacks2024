<script lang="ts">
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { BottomNav, BottomNavItem, Button, DarkMode } from 'flowbite-svelte';
	import { GridSolid, SearchOutline, UserSolid } from 'flowbite-svelte-icons';
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import { getMessaging, getToken } from 'firebase/messaging';
	import '../app.css';
	import { getFirestore } from 'firebase/firestore';
	import { publishPublicUserData } from '$lib/publicUserData';
	import UserAvatar from '$lib/UserAvatar.svelte';
	import LogoWithText from '$lib/LogoWithText.svelte';

	const firebaseConfig = {
		apiKey: 'AIzaSyCjUnR1Eydjr3qxouIl4fxiXyQvG2auUj8',
		authDomain: 'neovim-btw.firebaseapp.com',
		projectId: 'neovim-btw',
		storageBucket: 'neovim-btw.appspot.com',
		messagingSenderId: '930780589668',
		appId: '1:930780589668:web:6472e046a1bddfa5b0f971'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	auth.onAuthStateChanged(() => publishPublicUserData());
	const firestore = getFirestore(app);
	const messaging = getMessaging(app);
	getToken(messaging, {
		vapidKey:
			'BGK8g4omXiFrAHqvsH70r1r6CqAT-lmXQm5wYY7W6AqC1_PS1gNSBZj2ciVCGbC8BYrIUKH_nwlq-Ad55DI8wuY'
	})
		.then((currentToken) => {
			if (currentToken) {
				// Send the token to your server and update the UI if necessary
				console.log(`Token: ${currentToken}`);
				fetch('https://standup-interval-ntfy.fly.dev/register', {
					method: 'POST',
					mode: 'cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						token: currentToken
					})
				}).then((response) => {
					console.log('Successfully sent token to registrar', response);
				});
			} else {
				console.log('No registration token available. Request permission to generate one.');
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
		});
</script>

<FirebaseApp {auth} {firestore}>
	<div class="flex flex-col w-full h-screen space-y-4 dark:bg-gray-800 dark:text-white">
		<div class="w-full bg-primary-600 h-20 flex flex-row items-center space-x-4 p-5">
			<a href="/"><LogoWithText color="white" /></a>
			<div class="flex-auto" />
			<SignedIn let:user>
				<a href="/user" class="flex flex-row items-center">
					<UserAvatar userId={user.uid} />
					<span class="p-3 text-white">{user.displayName}</span>
				</a>
			</SignedIn>
			<DarkMode btnClass="w-5 p-2 text-white" />
		</div>
		<div class="flex-auto overflow-auto">
			<slot />
		</div>

		<BottomNav position="absolute" classInner="grid-cols-3">
			<BottomNavItem btnName="Grid" href="/">
				<GridSolid
					class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Search" href="/searchuser">
				<SearchOutline
					class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Friends" href="/friends">
				<UserSolid
					class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
		</BottomNav>
	</div>
</FirebaseApp>
