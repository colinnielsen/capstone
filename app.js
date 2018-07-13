// //RENDERER
// var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
// // renderer.setClearColor(0xffffff);
// // renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);

// //CAMERA
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// camera.lookAt(new THREE.Vector3(0, 0, 0));



// var scene = new THREE.Scene();
// //camera.position.set(0,0,0)

//SCENE
// var scene = new THREE.Scene();

//LIGHTS
// var light = new THREE.AmbientLight(0xffffff, .05)
// scene.add(light)

// var light1 = new THREE.PointLight(0xffffff, .5)
// scene.add(light1)
// //MATERIALS 
// var material = new THREE.LineBasicMaterial({
//     color: 0x0000ff
//     // side: THREE.DoubleSide  //might need this for lines
// })

//GEOMETRY _ OBJECTS
// var geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
// geometry.vertices.push(new THREE.Vector3(0, 10, 0));
// geometry.vertices.push(new THREE.Vector3(10, 0, 0));
// var geometry = new THREE.BoxGeometry(100, 100, 100);
// geometry.computeLineDistances();
// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.z = -1000;
// mesh.position.x = -100;
// scene.add(mesh);
// var line = new THREE.Line(geometry, material);
// scene.add(line)
// var geometry2 = new THREE.SphereGeometry(50, 20, 20);
// var mesh2 = new THREE.Mesh(geometry2, material);
// mesh2.position.z = -1000;
// mesh2.position.x = 100;
// scene.add(mesh2);


// var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);
// var mesh3 = new THREE.Mesh(geometry3, material);
// mesh3.rotation.x = -90 * Math.PI / 180;
// mesh3.position.y = -100;
// scene.add(mesh3);



//RENDER LOOP
// renderer.render(scene, camera)
// requestAnimationFrame(render);

// function render() {
//     // mesh.rotation.x += 0.01;
//     // mesh.rotation.y += 0.01;
//     renderer.render(scene, camera);
//     // requestAnimationFrame(render);
// }

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
raycaster.linePrecision = 1;


var mouseX = 0, mouseY = 0
var container;
var camera, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
//     windowHalfX = window.innerWidth / 2,
//     windowHalfY = window.innerHeight / 2,
//     SEPARATION = 200,
//     AMOUNTX = 10,
//     AMOUNTY = 10,
//     camera, scene, renderer;
init();
animate();
function init() {
    var container, separation = 100, amountX = 50, amountY = 50,
        particles, particle;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = -600;
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    // particles
    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, 0.2, 0, PI2, true);
            context.fill();
        }
    });
    var points = [];
    for (var i = 0; i < 30; i++) {
        particle = new THREE.Sprite(material);
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar(Math.random() * 200 + 150);
        particle.scale.x = particle.scale.y = 10;
        scene.add(particle);
        points.push(particle.position);
    }
    // lines
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: .8 }));
    scene.add(line);
    document.addEventListener('mousemove', onMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}


function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    raycaster.setFromCamera(mouse, camera);
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    // console.log(scene)
    // var intersects = raycaster.intersectObjects(scene.children);
    // for (var i = 0; i < intersects.length; i++) {
    //     intersects[i].object.material.color.set(0x9800ff);
    // }

    renderer.render(scene, camera);


}