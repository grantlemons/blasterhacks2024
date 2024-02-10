<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyCjUnR1Eydjr3qxouIl4fxiXyQvG2auUj8",
    authDomain: "neovim-btw.firebaseapp.com",
    projectId: "neovim-btw",
    storageBucket: "neovim-btw.appspot.com",
    messagingSenderId: "930780589668",
    appId: "1:930780589668:web:6472e046a1bddfa5b0f971"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
</script>

<FirebaseApp {auth} {app}>
	<slot />
</FirebaseApp>
