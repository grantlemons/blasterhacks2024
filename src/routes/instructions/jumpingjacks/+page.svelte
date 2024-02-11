<script lang="ts">
  import ReppableInstructions from '../../../lib/ReppableInstructions.svelte';
  import GenericInstructions from '../../../lib/instructions/generic.svelte';
</script>

<GenericInstructions workoutKind="jumpingJacks">
  <ReppableInstructions reps={20} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Jumping Jacks</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
