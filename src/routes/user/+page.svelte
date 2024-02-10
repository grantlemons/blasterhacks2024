<script lang="ts">
	import { SignedIn, SignedOut } from "sveltefire";
  import { Button } from "flowbite-svelte";
</script>


<div class="flex flex-row items-center justify-center w-full h-full">
  <SignedIn let:user>
    <p><span class="font-bold">{user.displayName}</span>, you are logged in!</p>
  </SignedIn>
  
  <SignedOut>
    You are not logged in.
    <Button href="/login">Login</Button>
  </SignedOut>
</div>
