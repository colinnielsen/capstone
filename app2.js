var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
raycaster.linePrecision = 1;


var mouseX = 0, mouseY = 0
var container;
var camera, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
function init() {
    var container, separation = 100, amountX = 50, amountY = 50,
        particles, particle;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = -100
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    // 
    var material = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-10, 80, -80),
        new THREE.Vector3(-10, -80, 0),
    );

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeBoundingSphere();
    var line = new THREE.Line(geometry, material);
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
    mouseX = (event.clientX - windowHalfX) / 8;
    mouseY = (event.clientY - windowHalfY) / 8;
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


}