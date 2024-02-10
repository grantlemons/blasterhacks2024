<script lang="ts">
	import Avatar from 'svelte-boring-avatars';

	export let userId: string;
  export let size = "40px";
</script>

<a href={`/user/${userId}`}><Avatar {size} name={userId} variant="beam" /></a>
