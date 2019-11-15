<script>
  import { user, droid } from "../stores.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import Drone from "../components/Drone.svelte";
  import PiloteInfo from "../components/PiloteInfo.svelte";
  
  let user_value, droneState, socket;

  const unsubscribe = user.subscribe(value => {
    user_value = value;
  });

  const turnRight = () => {
    droneState.direction += droneState.direction < 90 ? 10 : 0;
  };

  const turnLeft = () => {
    droneState.direction -= droneState.direction > -90 ? 10 : 0;
  };

  onMount(() => {
    if (user_value.name === "") {
      navigate("/login", { replace: true });
    } else {
      socket = io("http://localhost:3000");
      socket.on("welcome", initDroneState => {
        socket.emit("newUser", user_value);
        droneState = initDroneState;
      });
      socket.on("newState", newDroneState => {
        droneState = newDroneState;
      })
    }
  });

  $: if(socket != undefined) {
    socket.emit("action", user_value, droneState);
  }

  $:droid.update(() => ({
    isHyperspace: droneState && droneState.power === 100
  }));

</script>

<PiloteInfo surname={user_value.surname} color={user_value.color}/>
{#if droneState}
<div class="cockpit">
  <ul class="infos">
    <li>Power: {droneState.power}%</li>
    <li>Direction: {droneState.direction}°</li>
  </ul>
  <Drone power={droneState.power} direction={droneState.direction}/>
  <div class="cockpit__control">
    <button class="cockpit__left btn" on:click={turnLeft}>Left</button>
    <div class="cockpit__speed">
      <input
        value="0"
        class="cockpit__speed-input"
        type="range"
        orient="vertical"
        min="0"
        max="100"
        bind:value={droneState.power} />
    </div>
    <button class="cockpit__right btn" on:click={turnRight}>Right</button>
  </div>
</div>
{/if}