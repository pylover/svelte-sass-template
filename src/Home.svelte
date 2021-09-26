<div class="sm0 md0 lg1 xg1"></div>
<div class="sm10 md10 lg8 xg6">
  <h2>Home</h2>
</div>
<div class="sm0 md0 lg1 xg3"></div>

<style type="text/sass" scoped>
  @import 'styles/grid'

</style>
<script>
import { onMount } from 'svelte';

/* Properties */
export let loading = true;

onMount(async function() {
  loading = false;
});

</script>
