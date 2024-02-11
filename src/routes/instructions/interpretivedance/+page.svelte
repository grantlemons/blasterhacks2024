<script lang="ts">
  import { Heading, Li, List } from "flowbite-svelte";
  import GenericInstructions from '../../../lib/instructions/generic.svelte';
</script>

<GenericInstructions workoutKind="interpretiveDance">
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Do an interpretive dance</Heading>
    <article>
      <p>Moving your joints is good for your body. It's like the opposite of sitting in your office chair the whole day.</p>
    </article>
  </div>
</GenericInstructions>
