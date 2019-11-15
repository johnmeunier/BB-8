<script>
  import { user } from "../stores.js";
  import { navigate } from "svelte-routing";
  import { generateARandomColor, generateSurname } from "../services";

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

<h2>Who are you ?</h2>
<input on:input={nameHandler} placeholder="Your name" class="btn size-full" />
<button on:click={go} class="btn size-full">Go !</button>
