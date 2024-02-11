<script lang="ts">
  import { SignedIn, SignedOut  } from 'sveltefire';
  import { Button } from 'flowbite-svelte';
  import CameraModal from '../../routes/cameraModal.svelte';

  let showModal = false;
  async function openModal() {
    showModal = true;
  }
</script>

<main class="flex flex-col justify-between h-full md:justify-normal md:h-min md:w-3/5 p-6">
  <SignedIn>
    <slot name="instructions-content" />
    <Button class="mt-4" on:click={() => showModal=true}>Upload a post</Button>
    <CameraModal bind:showModal />
  </SignedIn>
  <SignedOut>
    <p>You must log in to participate in the workout.</p>
  </SignedOut>
</main>
