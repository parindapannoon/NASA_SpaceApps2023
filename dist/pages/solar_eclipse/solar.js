import "./solar.css";
import * as THREE from "https://unpkg.com/browse/three@0.150.1/";
import { OrbitControls } from "/https://unpkg.com/browse/three@0.150.1/examples/jsm/controls/OrbitControls";
import * as TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.6.0/Tween.min.js";

const scene = new THREE.Scene();
const camera = getCamera();
const moon = getMoon();
const earth = getEarth(moon);
const sun = getSun(earth);

function getCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(42.7858969830972, 7.20625517131602, 18.64570913089013);
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
  const earthTexture = new THREE.TextureLoader().load(
    "../../Images/Large_World_Physical_Map.png"
  );
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10, 50, 50),
    earthMaterial
  );
  scene.add(earth);
  earth.add(moon);
  earth.position.set(-30, 80, 40);
  earth.rotation.y = 3;
  earth.rotation.z = 0;
  earth.rotation.x = -0.5;
  const atmosphereGeometry = new THREE.SphereGeometry(11, 50, 50);
  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  atmosphere.position.set(-0.5, 0.5, 0);
  earth.add(atmosphere);
  return earth;
}

function getMoon() {
  const moonTexture = new THREE.TextureLoader().load("../../Images/moon.jpg");
  const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    moonMaterial
  );
  moon.position.set(-5, -5, 20);
  return moon;
}

function getSun(earth) {
  const light = new THREE.PointLight(0xffffff);
  const sunTexture = new THREE.TextureLoader().load("../../Images/sun.jpg");
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), sunMaterial);
  light.castShadow = true;
  let x = -5;
  let y = -70;
  let z = -40;
  sun.position.set(x, y, z);
  light.position.set(x, y, z);
  scene.add(light);
  scene.add(sun);
  sun.add(earth);
  return sun;
}

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const spaceTexture = new THREE.TextureLoader().load("../../Images/space.jpg");
scene.background = spaceTexture;

// const gridHelper = new THREE.GridHelper(1000, 100);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

const controls = getControls();
function getControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  return controls;
}

function animate() {
  controls.update();
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Annular

const annularEclipseCard = document.getElementById("annularEclipse");

annularEclipseCard.addEventListener("click", () => {
  const tab2Radio = document.getElementById("tab4-2");
  tab2Radio.checked = true;
  window.location.hash = "s1_annular";
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
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-3, 24, 44);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 10, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -10, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

const annularEclipseTab = document.getElementById("tab4-2");

annularEclipseTab.addEventListener("click", () => {
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-3, 24, 44);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 10, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -10, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

const annularPerspective = document.getElementById("perspective_annular_btn");
annularPerspective.addEventListener("click", () => {
  const cameraPosition = { x: 0.3408221712687053, y: 0.07533387067291145, z: 0.40069284200128685 };
  const duration = 1000;
  console.log(camera.position);
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 10, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -10, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -21 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

// Total
const totalEclipseCard = document.getElementById("totalEclipse");
const EclipseLines = [];
const MvGroup = [];
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
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 11, 20);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 6, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -6, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -0.05, z: 0 },
    { x: 1, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0.05, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

const totalEclipseTab = document.getElementById("tab4-3");

totalEclipseTab.addEventListener("click", () => {
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 11, 20);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 6, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -6, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -0.05, z: 0 },
    { x: 1, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0.05, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

// Partial
const partialEclipseCard = document.getElementById("partialEclipse");

partialEclipseCard.addEventListener("click", () => {
  const tab1Radio = document.getElementById("tab4-1");
  tab1Radio.checked = true;
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
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 18.5, 17.5);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 14.5, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 2, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

const partialEclipseTab = document.getElementById("tab4-1");

partialEclipseTab.addEventListener("click", () => {
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 18.5, 17.5);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 14.5, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 2, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
});

const partialPerspective = document.getElementById("perspective_partial_btn");
partialPerspective.addEventListener("click", () => {
  const cameraPosition = { x: 1.8279652345825348, y: 2.4686074248931043, z: 8.855904727063713 };
  const duration = 1000;
  console.log(camera.position);
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 14.5, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 2, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: -50, z: -440 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 8, z: 0 },
    { x: 0, y: 50, z: -440 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  panCameraTo(cameraPosition, duration);
  scene.add( line1, line2, line3, line4);
});

// Hybrid
const hybridEclipseCard = document.getElementById("hybridEclipse");

hybridEclipseCard.addEventListener("click", () => {
  const tab4Radio = document.getElementById("tab4-4");
  tab4Radio.checked = true;
  window.location.hash = "s1_hybrid";
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
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 16.5, 30);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 7.5, z: 0 },
    { x: 0, y: 3, z: -35 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -7.5, z: 0 },
    { x: 0, y: -3, z: -35 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  console.log(moon.position);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -10 },
    { x: 1, y: -3, z: -34 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -10 },
    { x: 0, y: 3, z: -34 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  const lineMaterial5 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry5 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 17.5, z: 0 },
    { x: 0, y: 13, z: -36 },
  ]);
  const line5 = new THREE.Line(lineGeometry5, lineMaterial5);
  const lineMaterial6 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry6 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 2.5, z: 0 },
    { x: 0, y: 7, z: -36 },
  ]);
  const line6 = new THREE.Line(lineGeometry6, lineMaterial6);
  scene.add(line5);
  scene.add(line6);
  const lineMaterial7 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry7 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 9, z: 0 },
    { x: 1, y: 13, z: -35 },
  ]);
  const line7 = new THREE.Line(lineGeometry7, lineMaterial7);
  const lineMaterial8 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry8 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 11, z: 0 },
    { x: 0, y: 7, z: -35 },
  ]);
  const line8 = new THREE.Line(lineGeometry8, lineMaterial8);
  scene.add(line7);
  scene.add(line8);
  EclipseLines.push(line5);
  EclipseLines.push(line6);
  EclipseLines.push(line7);
  EclipseLines.push(line8);
  const moonTexture2 = new THREE.TextureLoader().load("../../Images/moon.jpg");
  const moonMaterial2 = new THREE.MeshBasicMaterial({ map: moonTexture2 });
  const moon2 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    moonMaterial2
  );
  moon2.position.set(0, 10, -36);
  scene.add(moon2);
  EclipseLines.push(moon2);
  panCameraTo(cameraPosition, duration);
});

const hybridEclipseTab = document.getElementById("tab4-4");

hybridEclipseTab.addEventListener("click", () => {
  EclipseLines.forEach((line) => {
    scene.remove(line);
  });
  const earthPosition = new THREE.Vector3(0, 0, 440);
  const sunPosition = new THREE.Vector3(0, 0, -440);
  const moonPosition = new THREE.Vector3(-2, 16.5, 30);
  const cameraPosition = {
    x: 42.7858969830972,
    y: 7.20625517131602,
    z: 18.64570913089013,
  };
  const duration = 1000;
  new TWEEN.Tween(earth.position)
    .to(earthPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(moon.position)
    .to(moonPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(earth.rotation)
    .to({ y: 9.5 }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(sun.position)
    .to(sunPosition, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  console.log(camera.position);
  const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry1 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 7.5, z: 0 },
    { x: 0, y: 3, z: -35 },
  ]);
  const line1 = new THREE.Line(lineGeometry1, lineMaterial1);
  const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: -7.5, z: 0 },
    { x: 0, y: -3, z: -35 },
  ]);
  const line2 = new THREE.Line(lineGeometry2, lineMaterial2);
  scene.add(line1);
  scene.add(line2);
  console.log(moon.position);
  const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry3 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -10 },
    { x: 1, y: -3, z: -34 },
  ]);
  const line3 = new THREE.Line(lineGeometry3, lineMaterial3);
  const lineMaterial4 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry4 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 0, z: -10 },
    { x: 0, y: 3, z: -34 },
  ]);
  const line4 = new THREE.Line(lineGeometry4, lineMaterial4);
  scene.add(line3);
  scene.add(line4);
  EclipseLines.push(line1);
  EclipseLines.push(line2);
  EclipseLines.push(line3);
  EclipseLines.push(line4);
  const lineMaterial5 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry5 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 17.5, z: 0 },
    { x: 0, y: 13, z: -36 },
  ]);
  const line5 = new THREE.Line(lineGeometry5, lineMaterial5);
  const lineMaterial6 = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const lineGeometry6 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 2.5, z: 0 },
    { x: 0, y: 7, z: -36 },
  ]);
  const line6 = new THREE.Line(lineGeometry6, lineMaterial6);
  scene.add(line5);
  scene.add(line6);
  const lineMaterial7 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry7 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 9, z: 0 },
    { x: 1, y: 13, z: -35 },
  ]);
  const line7 = new THREE.Line(lineGeometry7, lineMaterial7);
  const lineMaterial8 = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const lineGeometry8 = new THREE.BufferGeometry().setFromPoints([
    { x: 0, y: 11, z: 0 },
    { x: 0, y: 7, z: -35 },
  ]);
  const line8 = new THREE.Line(lineGeometry8, lineMaterial8);
  scene.add(line7);
  scene.add(line8);
  EclipseLines.push(line5);
  EclipseLines.push(line6);
  EclipseLines.push(line7);
  EclipseLines.push(line8);
  const moonTexture2 = new THREE.TextureLoader().load("../../Images/moon.jpg");
  const moonMaterial2 = new THREE.MeshBasicMaterial({ map: moonTexture2 });
  const moon2 = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    moonMaterial2
  );
  moon2.position.set(0, 10, -36);
  scene.add(moon2);
  EclipseLines.push(moon2);
  panCameraTo(cameraPosition, duration);
});

// Panning Camera
function panCameraTo(targetPosition, duration) {
  const cameraStartPosition = camera.position.clone();
  const cameraEndPosition = new THREE.Vector3(
    targetPosition.x,
    targetPosition.y,
    targetPosition.z
  );
  new TWEEN.Tween(cameraStartPosition)
    .to(cameraEndPosition, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.position.copy(cameraStartPosition);
    })
    .start();
}


const totalPerspective = document.getElementById("perspective_total_btn");
totalPerspective.addEventListener("click", () => {
  const cameraPosition = { x: 0.000009795891720626245, y: 0.000002775648649917108, z: 0.000012304086664350451 };
  const duration = 1000;
  console.log(camera.position);
  panCameraTo(cameraPosition, duration);
  const moveGroup = new THREE.Group();
  moveGroup.position.x += 30;
  moveGroup.position.z += 30;
  moveGroup.add(sun, line1, line2, line3, line4);
  scene.add(moveGroup);
});
const hybridPerspective = document.getElementById("perspective_hybrid_btn");
hybridPerspective.addEventListener("click", () => {
  const cameraPosition ={ x: 0.001999758753102152, y: 0.000005930320717454522, z: 0.0027428060638607006 };
  const duration = 1000;
  console.log(camera.position);
  panCameraTo(cameraPosition, duration);
  const moveGroup = new THREE.Group();
  moveGroup.position.x += 30;
  moveGroup.position.z += 30;
  moveGroup.add(sun, line1, line2, line3, line4);
  scene.add(moveGroup);
});
const bullets = document.querySelectorAll(".bullets a");
const targets = document.querySelectorAll(".CSSgal s");
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    bullets.forEach((b) => {
      b.classList.remove("active");
    });
    bullet.classList.add("active");
    targets.forEach((target) => {
      target.style.display = "none";
    });
    targets[index].style.display = "block";
  });
});
