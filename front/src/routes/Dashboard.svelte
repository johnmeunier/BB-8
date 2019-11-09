<script>
  import { user } from "../stores.js";
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

</script>

<PiloteInfo surname={user_value.surname} color={user_value.color}/>
{#if droneState}
<div class="cockpit">
  <Drone power={droneState.power} direction={droneState.direction}/>
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
        bind:value={droneState.power} />
      <h4 class="cockpit__speed-value">{droneState.power}</h4>
      <h4 class="cockpit__direction-value">{droneState.direction}</h4>
    </div>
    <button class="cockpit__right btn" on:click={turnRight}>></button>
  </div>
</div>
{/if}