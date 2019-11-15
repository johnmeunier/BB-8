<script>
  import { Router, Route } from "svelte-routing";
  import Dashboard from "./routes/Dashboard.svelte";
  import Login from "./routes/Login.svelte";
  import "./global.scss";

  export let url = "";
</script>

<style>

</style>

<Router {url}>
  <div class="container">
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
  </div>
</Router>
