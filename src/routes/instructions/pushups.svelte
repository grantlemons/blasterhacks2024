<script lang="ts">
  import ReppableInstructions from '../../lib/ReppableInstructions.svelte';
  import GenericInstructions from '../../lib/instructions/generic.svelte';
</script>

<GenericInstructions>
  <ReppableInstructions reps={10} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Push-ups</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
