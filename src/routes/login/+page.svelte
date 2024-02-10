<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
  import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
  import * as firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'
	import { onDestroy, onMount } from 'svelte';

  let ui;
  
  onMount(async () => {
    let auth = getAuth();

    await auth.authStateReady();

    // Redirect if the user is already signed in.
    if (auth.currentUser != null){
      await goto('/user');
    }

    var uiConfig = {
      signInSuccessUrl: '/user',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID
      ],
    };

    ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  })

  onDestroy(() => {
    ui.delete();
  })

</script>

<div class="w-full h-full flex flex-col justify-center items-center font-bold text-lg">
  <div id="firebaseui-auth-container" class="w-[400px]"></div>
</div>
