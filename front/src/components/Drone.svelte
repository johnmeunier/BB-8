<script>

export let power, direction;

</script>


<div class="drone" >
    <img src="assets/bb8.png" style="transform: translateY(-{power / 1.3}px) perspective(14vh) rotateX({(power / 100) * 60}deg)
    rotateY({direction / 1.3}deg)" />
</div>