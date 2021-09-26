<a 
  {id} 
  class:current={current == target}
  {style} 
  href={!internal? target: undefined} 
  on:click={internal? click: undefined}
  >
  {#if icon}
    <svg><use xlink:href={"#icon-" + icon}></use></svg>
  {/if}
  {#if title}
    <span class:lpad={icon == null}>{title}</span>
  {/if}
</a>
<script>
import { getContext } from 'svelte';
export let title = '';
export let target;
export let icon = null;
export let id = '';
export let style = '';
export let current;
let internal = false;

const { navigate } = getContext('nav');

function click() {
  navigate(target);
}

if (target !== undefined && target.startsWith('/')) {
  internal = true;
}

</script>
<style lang="sass" type="text/sass">

a
  float: right
  // Doozak
  height: $navheight
  line-height: $navheight 
  vertical-align: middle
  overflow: hidden
  &.current
    color: $mangool
  > *
    float: left
  svg
    width: $navheight
    margin-top: $navheight * .25
    height: $navheight * .5
  span
    margin-right: $gutter
    vertical-align: middle
    line-height: $navheight 

.lpad
  margin-left: $gutter

</style> 

