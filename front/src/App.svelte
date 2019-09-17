<script>
  import { Router, Link, Route } from "svelte-routing";
  import Dashboard from "./routes/Dashboard.svelte";
  import Login from "./routes/Login.svelte";
  import "./global.scss";

  export let url = "";
</script>

<style>

</style>

<Router {url}>
  <div class="container">
    <!-- <nav>
      <span class="btn">
        <Link to="login">Login</Link>
      </span>
      <span class="btn">
        <Link to="dashboard">Dashboard</Link>
      </span>
    </nav> -->
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />
  </div>
</Router>
