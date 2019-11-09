<script>

export let power, direction;

</script>


<div
    class="drone"
    style="transform: translateY(-{power / 1.3}px) perspective(130px) rotateX({(power / 100) * 60}deg)
    rotateY({direction / 1.3}deg)" />