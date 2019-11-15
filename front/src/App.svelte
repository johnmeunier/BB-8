<script>
  import { Router, Link, Route } from "svelte-routing";
  import Dashboard from "./routes/Dashboard.svelte";
  import Login from "./routes/Login.svelte";
  import "./global.scss";
  import { droid } from './stores';
  export let url = "";
</script>

<style>

</style>

<Router {url}>
<div class={`scene ${$droid.isHyperspace ? 'scene--visible' : ''}`}>
  <div class="wrap">
      <div class="wall wall-right"></div>
      <div class="wall wall-left"></div>   
      <div class="wall wall-top"></div>
      <div class="wall wall-bottom"></div> 
      <div class="wall wall-back"></div>    
  </div>
  <div class="wrap">
      <div class="wall wall-right"></div>
      <div class="wall wall-left"></div>   
      <div class="wall wall-top"></div>
      <div class="wall wall-bottom"></div>   
      <div class="wall wall-back"></div>    
  </div>
</div>
  <div class="container">
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
  </div>
</Router>
