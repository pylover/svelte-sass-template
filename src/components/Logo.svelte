<a href="/">
  <svg>
    <use xlink:href="#icon-logo"></use>
  </svg>{ title }
</a>
<style lang="sass" type="text/sass" scoped>

$h: $navheight - $gutter

a
  height: $h 
  line-height: $h 
  vertical-align: baseline
  font-size: $fontsize + 30
  font-weight: 700
  svg
    /* Doozak */
    width: $h * .8
    height: $h * .8
    margin-right: $gutter

    /* Bazak */
    fill: $logo-color
</style> 
<script>
  export let title;
</script>
