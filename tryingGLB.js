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
var student = {}
var forward = 0;
var left = 0;

//event listeners to get id forrwards and backwards






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
        model.position.set(setup[2].x, setup[2].y, setup[2].z + 0.05);
        scene.add(model);
    });

    loader.load('./assets/Back.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[3].x, setup[3].y, setup[3].z);
        scene.add(model);
    });

    loader.load('./assets/Back.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[3].x, setup[3].y, setup[3].z + 3.4);
        scene.add(model);
    });


    loader.load('./assets/Board.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        model.position.set(setup[6].x, setup[6].y, setup[6].z);
        scene.add(model);
    });

    loader.load('./assets/tableChair.glb', function (glb) {
        console.log(glb);
        const model = glb.scene.children[0];
        // model.scale.set(0.009, 0.009, 0.009);
        model.position.set(setup[4].x, setup[4].y, setup[4].z);
        scene.add(model);
    });
    // loader.load('./assets/Student.glb', function (glb) {
    //     const model = glb.scene.children[0];
    //     model.scale.set(0.009, 0.009, 0.009);
    //     scene.add(model);
    // });

    // loader.load('./assets/studentTable.glb', function (glb) {
    //     console.log("stdentChair", glb);
    //     const model = glb.scene.children[0];
    //     model.position.set(setup[5].x, setup[5].y, setup[5].z);
    //     scene.add(model);
    // });

    // loader.load('./assets/studentTable.glb', function (glb) {
    //     console.log("stdentChair", glb);
    //     const model = glb.scene.children[0];
    //     model.position.set(setup[5].x + 2, setup[5].y, setup[5].z);
    //     scene.add(model);
    // });
    // loader.load('./assets/studentTable.glb', function (glb) {
    //     console.log("stdentChair", glb);
    //     const model = glb.scene.children[0];
    //     model.position.set(setup[5].x + 2, setup[5].y, setup[5].z + 1);
    //     scene.add(model);
    // });
    // loader.load('./assets/studentTable.glb', function (glb) {
    //     console.log("stdentChair", glb);
    //     const model = glb.scene.children[0];
    //     model.position.set(setup[5].x, setup[5].y, setup[5].z + 1);
    //     scene.add(model);
    // });
});

loader.load('./assets/teacher.glb', function (glb) {
    scene.remove(scene.children[-1]);
    const model = glb.scene.children[0];
    model.position.set(0, 0, 0);
    model.rotation.set(-1.7, 0, 0);
    // scene.updateMatrix(model);
    model.name = "teacher";

    scene.add(model);
});

readTextFile("./student.json", function (text) {
    student = JSON.parse(text);
    console.log("student Length", Object.keys(student).length);
    for (var i = 0; i < Object.keys(student).length; i++) {
        console.log("student", student[i].x);
        var count = 0;
        loader.load('./assets/Student.glb', function (glb) {
            console.log("student X", student[count].x);
            const model = glb.scene.children[0];
            model.scale.set(0.009, 0.009, 0.009);
            model.position.set(student[count]["t"].x, student[count]["t"].y, student[count]["t"].z);
            model.rotation.set(student[count]["r"].x - 1.5, student[count]["r"].y, student[count]["r"].z + 3.3);
            scene.add(model);
            count++;
        });
    }
});


// loader.load('./assets/teacher.glb', function (glb) {
//     console.log(glb);
//     const model = glb.scene.children[0];
//     model.position.set(0, 0, 0);
//     model.name = "teacher";
//     scene.add(model);
//     // scene.add(glb.scene);
//     // glb.scene.position.set(0, 20, 25);
// });

//read data from json file and store it in an array
// const data = require('./position.json');
// console.log(data);

// var selectMenu = document.getElementById("modelSelect");
// selectMenu.addEventListener("change", function () {
//     loader.load('./assets/teacher.glb', function (glb) {
//         var selectedObject = scene.getObjectByName('teacher');
//         scene.remove(selectedObject);
//         // console.log(glb);
//         //remove the previous model
//         scene.remove(scene.children[-1]);
//         const model = glb.scene.children[0];
//         model.position.set(data[selectMenu.value]["t"].x, data[selectMenu.value]["t"].y, data[selectMenu.value]["t"].z);
//         model.rotation.set(data[selectMenu.value]["r"].x - 1.7, data[selectMenu.value]["r"].y, data[selectMenu.value]["r"].z);
//         // scene.updateMatrix(model);
//         model.name = "teacher";

//         scene.add(model);
//         // glb.scene.position.set(0, 20, 25);
//     });
// });

document.addEventListener('keydown', function (event) {
    if (event.key == 'w') {
        left = left - 0.1;
    }
    if (event.key == 's') {
        left = left + 0.1;
    }
    if (event.key == 'a') {
        forward = forward - 0.1;
    }
    if (event.key == 'd') {
        forward = forward + 0.1;
    }

    console.log(event.key);

    loader.load('./assets/teacher.glb', function (glb) {
        var selectedObject = scene.getObjectByName('teacher');
        scene.remove(selectedObject);
        const model = glb.scene.children[0];
        model.position.set(forward, 0, left);
        model.rotation.set(-1.7, 0, 0);
        // scene.updateMatrix(model);
        model.name = "teacher";

        scene.add(model);
    });


})



// scene.add(new THREE.AxesHelper(20));
// scene.add(mesh4);

var light = new THREE.AmbientLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);
var light2 = new THREE.AmbientLight(0xFFFFFF, 1, 500);
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