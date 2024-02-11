<script lang="ts">
  import ReppableInstructions from '../../../lib/ReppableInstructions.svelte';
  import GenericInstructions from '../../../lib/instructions/generic.svelte';
</script>

<GenericInstructions workoutKind="wallSit">
  <ReppableInstructions reps={15} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Wall Sits</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
