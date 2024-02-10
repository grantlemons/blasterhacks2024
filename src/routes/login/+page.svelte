<script lang="ts">
  import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
  import * as firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'
	import { onMount } from 'svelte';
  
  onMount(() => {
    var uiConfig = {
      signInSuccessUrl: '/user',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID
      ],
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(getAuth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  })
</script>

<div class="w-full h-screen flex flex-col justify-center items-center font-bold text-lg">
  <div id="firebaseui-auth-container" class="w-[400px]"></div>
</div>
