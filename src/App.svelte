<svelte:window on:popstate={e => softNavigate(e.state.target)} />
<Icons />

<!-- Initialization Overlay -->
{#if loading}
  <div class="loading all10">
    <p>Loading, please wait ... </p>
  </div>
{/if}

<!-- Navbar -->
<nav>
  <Logo {title}/>
  <NavItem bind:current title="Home"     target="/" />
  <NavItem bind:current title="Kitchen"  target="/kitchen"/>
</nav>
  
<div class="content">
  <!-- Content -->
  <svelte:component  
  this={route.component}
  bind:loading
  />

  <div class="all10 footer">
    <p>{ title } © 2021</p>
  </div>

</div>
<script>
import { setContext } from 'svelte';
import Icons from './components/Icons.svelte';
import NavItem from './components/NavItem.svelte';
import Logo from './components/Logo.svelte';
import Home from './Home.svelte';
import Kitchen from './Kitchen.svelte';
import NotFound from './NotFound.svelte';

const routes = {
  '/':           {title: 'Home',       component: Home      },
  '/kitchen':    {title: 'Kitchen',    component: Kitchen   },
};

const notFound = {
  title: 'Not Found',
  component: NotFound,
};

let loading = true;
let route;
let current;
export let title;

/* Navigation */
function softNavigate(target) {
  current = target;
  route = routes[target];

  /* 404 */
  if (route == undefined) {
    route = notFound;
  }

  /* Set the page title */
  document.title = title;
  return false;
}


function navigate(target) {
  softNavigate(target);
  window.history.pushState({
    target
  }, 
    route.title, 
    `${window.location.origin}basePath${target}`
  );
}
setContext('nav', {navigate});

/* Match current route */
current = window.location.pathname.replace(new RegExp('^basePath'), '');
navigate(current);

</script>

<style lang="sass" type="text/sass" global>
body
  height: 100%
  color: $fg
  background-color: $bg-light

.content
  width: 100%
  height: calc(100% - #{$navheight})
  overflow-y: auto

nav
  background-color: $bg-dark
  width: 100%
  display: block
  height: $navheight
  border-style: inset
  border-bottom: 1px solid $bg-light
  padding-right: $gutter
  padding-left: $gutter
  
.loading
  position: absolute
  top: $navheight
  left: 0px
  width: 100%
  height: calc(100% - #{$navheight + $gutter})
  z-index: 80
  background: #000000
  text-align: center
  padding-top: $navheight * 3
  font-size: 2em

.footer p
  float: right
  font-size: 0.8em
</style>
