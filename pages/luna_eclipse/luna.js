import './luna.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from 'tween.js';

const scene = new THREE.Scene();

const camera = getCamera();
// const torus = getTorus();
const moon = getMoon();
const earth = getEarth(moon);
const sun = getSun(earth);
// addMeteors(5000);

function getCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.set(20.15977270118009,12.230600380212612,99.8580287591157);
  camera.position.set(-39.058632340523985, 3.7184701256332797, -38.659247362899194);
  
  return camera;
}

function getTorus() {
  const torusGeometry = new THREE.TorusGeometry(30, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  const torus = new THREE.Mesh(torusGeometry, material);
  scene.add(torus);
  return torus;
}

function getEarth(moon) {
  const earthTexture = new THREE.TextureLoader().load('../../Images/Large_World_Physical_Map.png');
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture }); // Use MeshBasicMaterial
  const earth = new THREE.Mesh(new THREE.SphereGeometry(10, 50, 50), earthMaterial);
  scene.add(earth);
  earth.add(moon);
  earth.position.set(-30, 80, 40);
  earth.rotation.y = 3;
  earth.rotation.z = 0;
  earth.rotation.x = -0.5;

  // Create the atmosphere sphere
  const atmosphereGeometry = new THREE.SphereGeometry(11, 50, 50); // Slightly larger radius
  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // Blue color for atmosphere
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide, // Render it on the back side to make it look like an atmosphere
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  atmosphere.position.set(-0.5, 0.5, 0);
  // Add the Moon to the Earth
  earth.add(atmosphere);
  return earth;
}

function getMoon() {
  const moonTexture = new THREE.TextureLoader().load('../../Images/moon.jpg');
  const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture }); // Use MeshBasicMaterial
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    moonMaterial
  );
  moon.position.set(-5, -5, 20);

  return moon;
}
function getSun(earth) {
  const light = new THREE.PointLight(0xffffff);
  const sunTexture = new THREE.TextureLoader().load('../../Images/sun.jpg');
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), sunMaterial);
  light.castShadow = true;
  let x=-5;
  let y=-70;
  let z=-40;
  sun.position.set(x, y, z);
  light.position.set(x, y, z);
  scene.add(light);
  scene.add(sun);
  sun.add(earth);
  return sun;
}

function addMeteors(n) {
  Array(n).fill().forEach(()=>{
    const geometry = new THREE.DodecahedronGeometry(1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    star.position.set(x, y, z);
    scene.add(star);
  });
}


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Set up shadow properties for the renderer
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const spaceTexture = new THREE.TextureLoader().load("../../Images/space.jpg");
scene.background = spaceTexture;

// const gridHelper = new THREE.GridHelper(1000, 100);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper( 1000 );
// scene.add( axesHelper );

const controls = getControls()
  
function getControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  return controls;
}

function animate() {
  // earth.rotation.y += 0.005;
  // sun.rotation.y+=0.0005;
  // torus.rotation.x+=0.01;
  controls.update();
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  // console.log(camera.position)
}

animate();

// Select the "penumbral Eclipse" card by its ID
const penumbralEclipseCard = document.getElementById("penumbralEclipse");

// Add a click event listener to the card
penumbralEclipseCard.addEventListener("click", () => {
  const tab1Radio = document.getElementById("tab4-1");
  tab1Radio.checked = true;
  window.location.hash = "s1_penumbral";
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  var descriptionDiv = document.querySelector(".description");
  var selectionDiv = document.querySelector(".selection");

  if (
    descriptionDiv.style.display === "none" ||
    descriptionDiv.style.display === ""
  ) {
    descriptionDiv.style.display = "block";
    selectionDiv.style.display = "none";
  } else {
    descriptionDiv.style.display = "none";
    selectionDiv.style.display = "block";
  }
    EclipseLines.forEach(line=> {
      scene.remove(line);
      });
    // Start your animation logic here
    const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
    const sunPosition = new THREE.Vector3(0, 0, -250);
    const moonPosition = new THREE.Vector3(2.5, -5.5, -34); 
    // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
    const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
    const duration = 1000;
    // Create a Tween for position

    new TWEEN.Tween(earth.position)
      .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.position)
    new TWEEN.Tween(moon.position)
    .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
    // earth.rotation.set(-10.5,-35,25)
    // Create a Tween for rotation
    new TWEEN.Tween(earth.rotation)
      .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.rotation)

    new TWEEN.Tween(sun.position)
      .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.position)
    console.log(moon.position)
    // Create a line from Earth to Sun
    const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
    scene.add(line3);
    scene.add(line4);
    EclipseLines.push(line1)
    EclipseLines.push(line2)
    EclipseLines.push(line3)
    EclipseLines.push(line4)
    panCameraTo(cameraPosition, duration)
});
const penumbralEclipseTab = document.getElementById("tab4-1");

// Add a click event listener to the card
penumbralEclipseTab.addEventListener("click", () => {
  
    EclipseLines.forEach(line=> {
      scene.remove(line);
      });
    // Start your animation logic here
    const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
    const sunPosition = new THREE.Vector3(0, 0, -250);
    const moonPosition = new THREE.Vector3(2.5, -5.5, -34); 
    // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
    const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
    const duration = 1000;
    // Create a Tween for position

    new TWEEN.Tween(earth.position)
      .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.position)
    new TWEEN.Tween(moon.position)
    .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
    // earth.rotation.set(-10.5,-35,25)
    // Create a Tween for rotation
    new TWEEN.Tween(earth.rotation)
      .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.rotation)

    new TWEEN.Tween(sun.position)
      .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
      .start();
    // console.log(earth.position)
    console.log(moon.position)
    // Create a line from Earth to Sun
    const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
    scene.add(line3);
    scene.add(line4);
    EclipseLines.push(line1)
    EclipseLines.push(line2)
    EclipseLines.push(line3)
    EclipseLines.push(line4)
    panCameraTo(cameraPosition, duration)
});

// Select the "Total Eclipse" card by its ID
const totalEclipseCard = document.getElementById("totalEclipse");
const EclipseLines = [];
// Add a click event listener to the card
totalEclipseCard.addEventListener("click", () => {
  const tab3Radio = document.getElementById("tab4-3");
  tab3Radio.checked = true;
  window.location.hash = "s1_total";
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  var descriptionDiv = document.querySelector(".description");
  var selectionDiv = document.querySelector(".selection");

  if (
    descriptionDiv.style.display === "none" ||
    descriptionDiv.style.display === ""
  ) {
    descriptionDiv.style.display = "block";
    selectionDiv.style.display = "none";
  } else {
    descriptionDiv.style.display = "none";
    selectionDiv.style.display = "block";
  }
  EclipseLines.forEach(line=> {
    scene.remove(line);
    });
  // Start your animation logic here
  const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
  const sunPosition = new THREE.Vector3(0, 0, -250);
  const moonPosition = new THREE.Vector3(2.5, -18.5, -34); 
  // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
  const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
  const duration = 1000;
  // Create a Tween for position

  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  new TWEEN.Tween(moon.position)
  .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
  .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
  .start();
  // earth.rotation.set(-10.5,-35,25)
  // Create a Tween for rotation
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.rotation)

  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  console.log(camera.position)
  // Create a line from Earth to Sun
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1)
  EclipseLines.push(line2)
  EclipseLines.push(line3)
  EclipseLines.push(line4)
  panCameraTo(cameraPosition, duration)
});
const totalEclipseTab = document.getElementById("tab4-3");
// Add a click event listener to the card
totalEclipseTab.addEventListener("click", () => {
 
  EclipseLines.forEach(line=> {
    scene.remove(line);
    });
  // Start your animation logic here
  const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
  const sunPosition = new THREE.Vector3(0, 0, -250);
  const moonPosition = new THREE.Vector3(2.5, -18.5, -34); 
  // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
  const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
  const duration = 1000;
  // Create a Tween for position

  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  new TWEEN.Tween(moon.position)
  .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
  .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
  .start();
  // earth.rotation.set(-10.5,-35,25)
  // Create a Tween for rotation
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.rotation)

  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  console.log(camera.position)
  // Create a line from Earth to Sun
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1)
  EclipseLines.push(line2)
  EclipseLines.push(line3)
  EclipseLines.push(line4)
  panCameraTo(cameraPosition, duration)
});
// Select the "penumbral Eclipse" card by its ID
const partialEclipseCard = document.getElementById("partialEclipse");

// Add a click event listener to the card
partialEclipseCard.addEventListener("click", () => {
  const tab2Radio = document.getElementById("tab4-2");
  tab2Radio.checked = true;
  window.location.hash = "s1_partial";
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  var descriptionDiv = document.querySelector(".description");
  var selectionDiv = document.querySelector(".selection");
  if (
    descriptionDiv.style.display === "none" ||
    descriptionDiv.style.display === ""
  ) {
    descriptionDiv.style.display = "block";
    selectionDiv.style.display = "none";
  } else {
    descriptionDiv.style.display = "none";
    selectionDiv.style.display = "block";
  }
  EclipseLines.forEach(line=> {
    scene.remove(line);
    });
  // Start your animation logic here
  const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
  const sunPosition = new THREE.Vector3(0, 0, -250);
  const moonPosition = new THREE.Vector3(2.5, -14.5, -34); 
  // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
  const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
  const duration = 1000;
  // Create a Tween for position

  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  new TWEEN.Tween(moon.position)
  .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
  .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
  .start();
  // earth.rotation.set(-10.5,-35,25)
  // Create a Tween for rotation
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.rotation)

  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  console.log(camera.position)
  // Create a line from Earth to Sun
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1)
  EclipseLines.push(line2)
  EclipseLines.push(line3)
  EclipseLines.push(line4)
  panCameraTo(cameraPosition, duration)
});
const partialEclipseTab = document.getElementById("tab4-2");

// Add a click event listener to the card
partialEclipseTab.addEventListener("click", () => {
  
  EclipseLines.forEach(line=> {
    scene.remove(line);
    });
  // Start your animation logic here
  const earthPosition = new THREE.Vector3(0, 0, 200); // Change to your desired position
  const sunPosition = new THREE.Vector3(0, 0, -250);
  const moonPosition = new THREE.Vector3(2.5, -14.5, -34); 
  // const atmospherePosition = new THREE.Vector3(0, 0, 200); 
  const cameraPosition = {x: 53.93954699028353, y: 6.034927045249182, z: 9.383289033961013};
  const duration = 1000;
  // Create a Tween for position

  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  new TWEEN.Tween(moon.position)
  .to(moonPosition, duration) // Adjust the duration (in milliseconds) as needed
  .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
  .start();
  // earth.rotation.set(-10.5,-35,25)
  // Create a Tween for rotation
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.rotation)

  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration) // Adjust the duration (in milliseconds) as needed
    .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as needed
    .start();
  // console.log(earth.position)
  console.log(camera.position)
  // Create a line from Earth to Sun
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([{x:0,y:43,z:34}, {x:0,y:-50,z:-220}]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);

  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([{x:0,y:-43,z:34}, {x:0,y:50,z:-220}]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);

  // Create a line from Earth to Sun
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:-50,z:-220}]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);

  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([{x:0,y:0,z:0}, {x:0,y:50,z:-220}]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1)
  EclipseLines.push(line2)
  EclipseLines.push(line3)
  EclipseLines.push(line4)
  panCameraTo(cameraPosition, duration)
});
function panCameraTo(targetPosition, duration) {
    const cameraStartPosition = camera.position.clone();
    const cameraEndPosition = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);

    // Use Tween.js to animate the camera position
    new TWEEN.Tween(cameraStartPosition)
        .to(cameraEndPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            camera.position.copy(cameraStartPosition);
        })
        .start();
}
