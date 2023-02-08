let scene, camera, renderer, clock, controls;
let lights = [], player;
let collider_cells;
let healthOverlay, winOverlay;
let collider_obstruction = [];

const room_size = 100;
const room_size2 = room_size >> 1;
const room_height = 8;
const collider_cell_size = 0.5;
const num_collider_cells = ~~Math.ceil(room_size / collider_cell_size);
const sqrt2 = Math.sqrt(2);
const PI4 = Math.PI / 4.;


window.onload = () => {
  init();
}

function init() {
  healthOverlay = document.getElementById("health");
  winOverlay = document.getElementById("win");

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x191919 );
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x0f0f0f);
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(renderer.domElement);

  const room = new Room();
  scene.add(room.getModel());

  clock = new THREE.Clock();

  player = new Player({ x: -2, y: 3, z: 0 });
  
  collider_obstruction.push(new Obstruction(5, 10));
  scene.add(collider_obstruction[0].object);
  
  spawnObstruction();
  
  requestPointerLock(renderer.domElement, controls);
  setTimeout(() => {
    renderer.domElement.className = "opaque";
    animate();
  }, 500);
  
  for(let i = 0; i < 50; i++){
	  temp1 = Math.random() * 10;
	  temp2 = Math.random() * 10;
	  if (temp1 > 5){
		  temp1 = 1;
	  }
	  else{ 
		  temp1 = -1;
	  }
	  
	  if(temp2 > 5){
		  temp2 = 1;
	  }
	  else{
		  tmep2 = -1;
	  }
	  lights.push(new Light({
		  x:(temp1 * temp2 * Math.floor(Math.random()*room_size*5)), 
		  y: 200, 
		  z:(temp1 * temp2 * Math.floor(Math.random()*room_size*5))
	  }));
  }
  
  const light_moon = new THREE.PointLight(0xffffff, 3, 400);
  const circle_moon = new THREE.Mesh(new THREE.SphereGeometry(25, 32, 32),
	      new THREE.MeshBasicMaterial(0xffffff)
	    );
  light_moon.add(circle_moon);
  
  const moon = light_moon;
  
  moon.position.set(0, 200, 0);
  scene.add(moon);
  
  /* 전등을  Scene에 추가 */
  for(let i = 0; i < lights.length; i++)
    scene.add(lights[i].object);
}


function animate() {
  if(player.dead || player.winner) return;
  const deltaTime = clock.getDelta() / 8.;

  player.animate(deltaTime);
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}