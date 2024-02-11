<script>
  import { Heading } from "flowbite-svelte";
  import GenericInstructions from "$lib/instructions/generic.svelte"
  import ReppableInstructions from "$lib/ReppableInstructions.svelte";

	let timestamp = window.localStorage.getItem("timestamp");
	let workout_seed = window.localStorage.getItem("workout_seed");
	console.log(timestamp, workout_seed);
	let workout_count = 6;
	let workout_index = Number(workout_seed) % workout_count;
</script>

{#if workout_index == 0}
<GenericInstructions workoutKind="callMom">
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Call your mom</Heading>
    <article>
      <p>Has it been a while?</p>
      <p>How has your mom influenced you personality? If you are a parent, or if you hypothetically were a parent, what aspects of your mom's parenting style would you try to mimic?</p>
    </article>
  </div>
</GenericInstructions>
{:else if workout_index == 1}	
<GenericInstructions workoutKind="interpretiveDance">
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Do an interpretive dance</Heading>
    <article>
      <p>Moving your joints is good for your body. It's like the opposite of sitting in your office chair the whole day.</p>
    </article>
  </div>
</GenericInstructions>
{:else if workout_index == 2}	
<GenericInstructions workoutKind="jumpingJacks">
  <ReppableInstructions reps={20} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Jumping Jacks</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
{:else if workout_index == 3}	
<GenericInstructions workoutKind="pushups">
  <ReppableInstructions reps={10} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Push-ups</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
{:else if workout_index == 4}	
<GenericInstructions workoutKind="walk">
  <div slot="instructions-content">
    <Heading tag="h1" class="block my-4">Take a quick walk</Heading>
    <article>
      <p>Aim for 5 to 10 minutes. You aren't allowed to use your phone until it's over; walking will give your brain a chance to reflect on what's happened today.</p>
    </article>
  </div>
</GenericInstructions>
{:else if workout_index == 5}	
<GenericInstructions workoutKind="wallSit">
  <ReppableInstructions reps={15} slot="instructions-content">
    <svelte:fragment slot="workout-kind">Wall Sits</svelte:fragment>
  </ReppableInstructions>
</GenericInstructions>
{/if}
