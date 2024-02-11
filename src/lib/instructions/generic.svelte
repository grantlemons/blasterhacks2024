<script lang="ts">
  import { SignedIn, SignedOut  } from 'sveltefire';
  import { Button } from 'flowbite-svelte';
  import CameraModal from '../../routes/cameraModal.svelte';
	import type { WorkoutKind } from '$lib/workoutPost';

  export let workoutKind: WorkoutKind;

  let showModal = false;
</script>

<div class="flex flex-row w-full justify-center">
  <main class="flex flex-col h-full md:justify-normal md:h-min w-[400px] p-6">
    <SignedIn>
      <slot name="instructions-content" />
      <Button class="mt-4" on:click={() => showModal=true}>Upload a post</Button>
      <CameraModal bind:showModal workoutKind={workoutKind} />
    </SignedIn>
    <SignedOut>
      <p>You must log in to participate in the workout.</p>
    </SignedOut>
  </main>
</div>
