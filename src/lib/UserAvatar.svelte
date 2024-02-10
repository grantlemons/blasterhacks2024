<script lang="ts">
  import Avatar from "svelte-boring-avatars"

  export let userId: string;
</script>

<Avatar size={40} name={userId} variant="beam"/>
