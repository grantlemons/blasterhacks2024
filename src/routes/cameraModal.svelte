<script lang='ts'>
  import { onMount } from 'svelte';
  import { Button, Modal } from 'flowbite-svelte';
  import { uploadImage } from '../lib/uploadImage.ts';

  export let showModal;

  let usingCamera = false;
  $: usingCamera = showModal;

  let canvas;
  let photoSrc;
  $: photoSrc = usingCamera ? null : photoSrc; // hide the preview image when taking a new photo
  let video;

  const width = 640;
  let height = 0; // automatically computed based on width (I think)

  async function insertStream(videoElem) {
    videoElem.srcObject = await navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        return stream;
      })
      .catch((e) => {
        console.log('There was an error with the webcam:', e);
      });
  }

  function takePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL('image/png');
    photoSrc = data;
    stopCamera();
  }

  function tryAgain() {
    usingCamera = true;
    photoSrc = null;
  }

  function stopCamera() {
    usingCamera = false;
    if (video != null) {
      video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    }
  }

  function postImage() {
    canvas.toBlob(uploadImage, 'image/png');
    showModal = false;
  }

</script>

<Modal bind:open={showModal} on:close={stopCamera} placement="center" outsideclose>
  {#if usingCamera}
    <video bind:this={video} use:insertStream autoplay playsinline class="rounded-lg" style="transform: scaleX(-1);"></video>
  {/if}
  <!-- Must use this hacky workaround because many mainstream browsers (most notably Safari) don't support ImageCapture. https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/ImageCapture#browser_compatibility -->
  <canvas bind:this={canvas} style="display: none"></canvas>
  {#if !usingCamera}
    <p>Does this look good?</p>
  {/if}
  <img src={photoSrc} class="rounded-lg" />
  <footer slot="footer" class="grow flex justify-center space-x-4">
    {#if usingCamera}
      <Button on:click={takePhoto} class="block">take photo</Button>
    {:else}
      <Button on:click={tryAgain} color="alternative" class="block">try again</Button>
      <Button on:click={postImage} class="block">post</Button>
    {/if}
  </footer>
</Modal>
