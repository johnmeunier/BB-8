<script>
  import { user } from "../stores.js";
  import { navigate } from "svelte-routing";
  import { generateARandomColor, generateSurname } from "../services";

  let name = "";

  const nameHandler = e => {
    user.update(user => ({
      ...user,
      name: e.target.value
    }));
  };

  const go = e => {
    user.update(({ name }) => ({
      ...user,
      surname: generateSurname(name),
      color: generateARandomColor()
    }));
    navigate("/dashboard");
  };
</script>

<form on:submit={go} class="login">
  <h2>Who are you ?</h2>
  <input on:input={nameHandler} placeholder="Your name" class="btn size-full" />
  <input type="submit" class="btn size-full" value="Go !" />
</form>