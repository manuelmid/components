<script>
	// al hacer un export de una variable,
    // indicamos que esto es un parámetro del componente
    // a estos parámetros se le conocen como "prop"
	export let name;
	let nombre = 'jj';
	let imagen = './images/img-1.jpg';
</script>

<main>
	<div class="wrapper">
		<i id="left" class="fa-solid fa-angle-left"></i>
		<div class="carousel">
		  <img src={imagen} alt="img" draggable="false">
		  <img src="images/img-2.jpg" alt="img" draggable="false">
		  <img src="images/img-3.jpg" alt="img" draggable="false">
		  <img src="images/img-4.jpg" alt="img" draggable="false">
		  <img src="images/img-5.jpg" alt="img" draggable="false">
		  <img src="images/img-6.jpg" alt="img" draggable="false">
		  <img src="images/img-7.jpg" alt="img" draggable="false">
		  <img src="images/img-8.jpg" alt="img" draggable="false">
		  <img src="images/img-9.jpg" alt="img" draggable="false">
		  <img src={imagen} alt="">
		</div>
	  <i id="right" class='fa-solid fa-angle-right'></i>
	  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>


<h1>Hello {nombre}</h1>
