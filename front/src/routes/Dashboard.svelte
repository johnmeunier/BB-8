<script>
  import { user } from "../stores.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let user_value;
  let power = 0;
  let direction = 0;

  const unsubscribe = user.subscribe(value => {
    user_value = value;
  });

  const turnRight = () => {
    direction += direction < 90 ? 10 : 0;
  };

  const turnLeft = () => {
    direction -= direction > -90 ? 10 : 0;
  };

  onMount(() => {
    if (user_value.name === "") {
      navigate("/login", { replace: true });
    } else {
      const socket = io("http://localhost:3000");
      socket.on("welcome", message => {
        socket.emit("newUser", user_value);
      });
    }
  });
</script>

<h2>Hello {user_value.surname}!</h2>
<h3>
  You're in the
  <span style="color:{user_value.color};">{user_value.color} team</span>
</h3>
<div class="cockpit">
  <div
    class="drone"
    style="transform: translateY(-{power / 1.3}px) perspective(130px) rotateX({(power / 100) * 60}deg)
    rotateY({direction / 1.3}deg)" />
  <div class="cockpit__control">
    <button class="cockpit__left btn" on:click={turnLeft}>{'<'}</button>
    <div class="cockpit__speed">
      <input
        value="0"
        class="cockpit__speed-input"
        type="range"
        orient="vertical"
        min="0"
        max="100"
        bind:value={power} />
      <h4 class="cockpit__speed-value">{power}</h4>
      <h4 class="cockpit__direction-value">{direction}</h4>
    </div>
    <button class="cockpit__right btn" on:click={turnRight}>></button>
  </div>
</div>
