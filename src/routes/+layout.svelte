<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';

	// for SPA
	export const prerender = true;

	// Initialize Firebase
	const app = initializeApp(/* your firebase config */);
	const firestore = getFirestore(app);
	const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
