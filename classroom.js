// import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js"

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
var controls = new OrbitControls(camera, renderer.domElement);
controls.update();


var wall1 = new THREE.BoxGeometry(10, 6, 0.5,);
var wall2 = new THREE.BoxGeometry(10, 6, 0.5,);
var wall3 = new THREE.BoxGeometry(10, 6, 0.5,);
var floor = new THREE.BoxGeometry(10, 12, 0.5,);
var whiteboard = new THREE.BoxGeometry(3, 2, 0.2,);
// var wall1 = new THREE.PlaneGeometry(3, 3, 320, 320);
// var wall2 = new THREE.PlaneGeometry(3, 3, 32)
// var wall3 = new THREE.PlaneGeometry(3, 3, 32)
var ball1 = new THREE.SphereGeometry(.5, 20, 300)
// var wall4 = new THREE.BoxGeometry(3, 3, 1)
var material1 = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
var material2 = new THREE.MeshLambertMaterial({ color: "red" });
var material3 = new THREE.MeshLambertMaterial({ color: "grey" });
var boardMaterial = new THREE.MeshLambertMaterial({ color: "white" });
var mesh1 = new THREE.Mesh(wall1, material1);
var mesh2 = new THREE.Mesh(wall2, material2);
var mesh3 = new THREE.Mesh(wall3, material1);
var mesh4 = new THREE.Mesh(floor, material3);
var meshball1 = new THREE.Mesh(ball1, material2);
var meshboard = new THREE.Mesh(whiteboard, boardMaterial);
// var mesh4 = new THREE.Mesh(wall4, material);
mesh2.position.x = 2;
mesh2.position.z = -2;
mesh3.position.x = 5;
mesh3.position.z = -2;
meshball1.position.x = 0;
meshball1.position.z = -3;
mesh1.position.z = -7;
mesh2.position.x = -5;
mesh4.position.y = -3
mesh4.position.z = -1
meshboard.position.z = -6.7;
// mesh.position.y = 2;
// mesh.position.y = 2;
// mesh.rotation.x = -Math.PI / 2;
// mesh2.rotation.set(1, 3, 0)
mesh1.rotation.set(0, 0, 0)
mesh2.rotation.set(0, 4.7, 0)
mesh3.rotation.set(0, 4.7, 0)
mesh4.rotation.x = 4.7
// ball1.rotation.set(0, 0, 0)
// mesh4.rotation.set(0, 10, 0)
// mesh1.scale.set(1, 2, 3)
// mesh2.scale.set(3, 2, 1)
// mesh3.scale.set(1, 2, 1)
// mesh4.scale.set(1, 2, 1)
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(meshball1);
scene.add(mesh4);
scene.add(meshboard);
scene.add(new THREE.AxesHelper(20));
// scene.add(mesh4);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);
var light2 = new THREE.PointLight(0xFFFFFF, 1, 500);
light2.position.set(0, 20, 25);
scene.add(light2);
var render = function () {
    requestAnimationFrame(render);
    // mesh1.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.scale.x -= 0.01;
    controls.update();
    renderer.render(scene, camera);
};

render();