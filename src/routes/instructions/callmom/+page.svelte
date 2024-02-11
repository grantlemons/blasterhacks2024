<script lang="ts">
  import { Heading } from "flowbite-svelte";
  import GenericInstructions from '../../../lib/instructions/generic.svelte';
</script>

<GenericInstructions workoutKind="callMom">
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Call your mom</Heading>
    <article>
      <p>Has it been a while?</p>
      <p>How has your mom influenced you personality? If you are a parent, or if you hypothetically were a parent, what aspects of your mom's parenting style would you try to mimic?</p>
    </article>
  </div>
</GenericInstructions>
