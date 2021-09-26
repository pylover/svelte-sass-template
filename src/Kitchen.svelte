<div class="sm0 md0 lg1 xg1"></div>
<div id="quickstart" class="sm10 md10 lg8 xg8">
  <h1>Header 1</h1>
  <h2>Header 2</h2>
  <h3>Header 3</h3>
  <h4>Header 4</h4>
  <h5>Header 5</h5>
  <h6>Header 6</h6>
</div>
<div class="sm0 md0 lg1 xg1"></div>

<style type="text/sass" scoped>
  @import 'styles/grid'
  
</style>
<script>
import { onMount } from 'svelte';

/* Properties */
export let busy = true;
export let loading = true;

onMount(function() {
  loading = false;
  busy = false;
});
</script>
