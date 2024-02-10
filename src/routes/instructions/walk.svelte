<script lang="ts">
  import { Heading, Li, List } from "flowbite-svelte";
  import GenericInstructions from '../../lib/instructions/generic.svelte';
</script>

<GenericInstructions>
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Take a quick walk</Heading>
    <article>
      <p>Aim for 5 to 10 minutes. You aren't allowed to use your phone until it's over; walking will give your brain a chance to reflect on what's happened today.</p>
    </article>
  </div>
</GenericInstructions>
