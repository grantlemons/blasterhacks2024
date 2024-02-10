<script lang="ts">
  import { Heading, Li, List } from "flowbite-svelte";

  export let reps;
</script>

<div>
  <Heading tag="h1" class="block my-4"><slot name="workout-kind" /></Heading>
  <article>
    <Heading tag="h3" class="my-8">Suggested procedure</Heading>
    <section class="mb-4">
      <Heading tag="h5">Round 1</Heading>
      <List>
        <Li>{reps} reps</Li>
        <Li>30-second break</Li>
      </List>
    </section>
    <section class="mb-4">
      <Heading tag="h5">Round 2</Heading>
      <List>
        <Li>{reps} reps</Li>
        <Li>30-second break</Li>
      </List>
    </section>
    <section class="mb-4">
      <Heading tag="h5">Round 3</Heading>
      <List>
        <Li>{reps} reps</Li>
        <Li>30-second break</Li>
      </List>
    </section>
  </article>
</div>
