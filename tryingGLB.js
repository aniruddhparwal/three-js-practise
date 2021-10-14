import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js"
// import * as data from './position.json';

// const { name } = data;
// console.log(name); // output 'testing'

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var data = {}
var setup = {}
//usage:
readTextFile("./position.json", function (text) {
    data = JSON.parse(text);
    console.log("data", data);
});
// readTextFile("./setup.json", function (text) {
//     setup = JSON.parse(text);
//     console.log("setup", setup);
// });

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

const loader = new GLTFLoader();
// loader.load('./assets/OnlyClassroom.glb', function (glb) {
//     console.log(glb);
//     scene.add(glb.scene);
// });
readTextFile("./setup.json", function (text) {
    setup = JSON.parse(text);
    console.log("setup", setup);
    loader.load('./assets/wall.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        console.log("sa", setup);
        model.position.set(setup[0].x, setup[0].y, setup[0].z);
        scene.add(model);
    });
    loader.load('./assets/wall.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[1].x, setup[1].y, setup[1].z);
        scene.add(model);
    });

    loader.load('./assets/base.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[2].x, setup[2].y, setup[2].z);
        scene.add(model);
    });

    loader.load('./assets/Back.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[3].x, setup[3].y, setup[3].z);
        scene.add(model);
    });
    loader.load('./assets/tableChair.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[4].x, setup[4].y, setup[4].z);
        scene.add(model);
    });
    loader.load('./assets/studentTable.glb', function (glb) {
        console.log("stdentChair", glb);
        const model = glb.scene.children[0];
        model.position.set(setup[5].x, setup[5].y, setup[5].z);
        scene.add(model);
    });
});


loader.load('./assets/teacher.glb', function (glb) {
    console.log(glb);
    const model = glb.scene.children[0];
    model.position.set(0, 0, 0);
    model.name = "teacher";
    scene.add(model);
    // scene.add(glb.scene);
    // glb.scene.position.set(0, 20, 25);
});

//read data from json file and store it in an array
// const data = require('./position.json');
// console.log(data);

var selectMenu = document.getElementById("modelSelect");
selectMenu.addEventListener("change", function () {
    loader.load('./assets/teacher.glb', function (glb) {
        var selectedObject = scene.getObjectByName('teacher');
        scene.remove(selectedObject);
        // console.log(glb);
        //remove the previous model
        scene.remove(scene.children[-1]);
        const model = glb.scene.children[0];
        model.position.set(data[selectMenu.value].x, data[selectMenu.value].y, data[selectMenu.value].z);
        // scene.updateMatrix(model);
        model.name = "teacher";

        scene.add(model);
        // glb.scene.position.set(0, 20, 25);
    });
});




// scene.add(new THREE.AxesHelper(20));
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