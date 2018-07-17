// import textAlign from 'three-text2d'

// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
// raycaster.linePrecision = 1;



var mouseX = 0, mouseY = 0
var container;
var camera, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
function init() {
    var container, separation = 100, amountX = 50, amountY = 50,
        particles, particle, controls;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);

    //controls 
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500
    controls.maxPolarAngle = Math.PI / 2;

    // materials 

    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 1
    });

    var PI2 = Math.PI * 2;
    var circleMaterial = new THREE.SpriteCanvasMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.8,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, .5, 0, PI2, true);
            context.fill();
        }
    });

    //geometry 

    // var points = [];
    // for (var i = 0; i < 2; i++) {
    //     particle = new THREE.Sprite(circleMaterial);
    //     particle.position.x = Math.random() * 2 - 1;
    //     particle.position.y = Math.random() * 2 - 1;
    //     particle.position.z = Math.random() * 2 - 1;
    //     particle.position.normalize();
    //     particle.position.multiplyScalar(Math.random() * 100 + 250);
    //     particle.scale.x = particle.scale.y = 10;
    //     // scene.add(particle);
    //     points.push(particle.position);
    // }

    // var skeletonGeometry = new THREE.BufferGeometry().setFromPoints(points);
    // var lineline = new THREE.Line(skeletonGeometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: .8 }));

    var line1geometry = new THREE.Geometry();
    line1geometry.vertices.push(
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(-55, -1000, 0)
    );

    var line2geometry = new THREE.Geometry();
    line2geometry.vertices.push(
        new THREE.Vector3(30, 40, 5),
        new THREE.Vector3(-4, -20, -6)
    );

    var line3geometry = new THREE.Geometry();
    line3geometry.vertices.push(
        new THREE.Vector3(-2, -10, 0),
        new THREE.Vector3(25, 12, 0)
    );

    var line4geometry = new THREE.Geometry();
    line4geometry.vertices.push(
        new THREE.Vector3(-10, -69, 8),
        new THREE.Vector3(50, -5, -20)
    );

    var line5geometry = new THREE.Geometry();
    line5geometry.vertices.push(
        new THREE.Vector3(10, -80, -25),
        new THREE.Vector3(-18, 12, 50)
    );

    var line6geometry = new THREE.Geometry();
    line6geometry.vertices.push(
        new THREE.Vector3(-35, 5, 0),
        new THREE.Vector3(-30, 40, -20)
    );

    var line7geometry = new THREE.Geometry();
    line7geometry.vertices.push(
        new THREE.Vector3(-150, 50, 0),
        new THREE.Vector3(-50, -100, 20)
    );

    // LINES
    var line1 = new THREE.Line(line1geometry, lineMaterial);
    var line2 = new THREE.Line(line2geometry, lineMaterial);
    var line3 = new THREE.Line(line3geometry, lineMaterial);
    var line4 = new THREE.Line(line4geometry, lineMaterial);
    var line5 = new THREE.Line(line5geometry, lineMaterial);
    var line6 = new THREE.Line(line6geometry, lineMaterial);
    var line7 = new THREE.Line(line7geometry, lineMaterial);

    // CIRCLES
    var circle1 = new THREE.Sprite(circleMaterial);
    circle1.position.y = 5;
    var circle2 = new THREE.Sprite(circleMaterial);
    circle2.position.x = 30;
    circle2.position.y = 40;
    circle2.position.z = 5;
    var circle3 = new THREE.Sprite(circleMaterial);
    circle3.position.x = 25
    circle3.position.y = 12
    // circle3.position.y = 12
    var circle4 = new THREE.Sprite(circleMaterial);
    circle4.position.x = 50
    circle4.position.y = -5
    circle4.position.z = -20
    var circle5 = new THREE.Sprite(circleMaterial);
    circle5.position.x = -18
    circle5.position.y = 12
    circle5.position.z = 50
    var circle6 = new THREE.Sprite(circleMaterial);
    circle6.position.x = -30
    circle6.position.y = 40
    circle6.position.z = -20

    // TEXT 
    var sprite = new SpriteText2D("SPRITE", { align: textAlign.center, font: '40px Arial', fillStyle: '#000000', antialias: false })
    scene.add(sprite)

    // SCENE ADD
    scene.add(line1, line2, line3, line4, line5, line6, line7);
    scene.add(circle1, circle2, circle3, circle4, circle5, circle6);
    // scene.add(text)

    // document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    // windowHalfX = window.innerWidth / 2;
    // windowHalfY = window.innerHeight / 2;
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX) / 30;
//     mouseY = (event.clientY - windowHalfY) / 64;
// }


function animate() {
    // window.scene = scece
    render();
    requestAnimationFrame(animate);
    // controls.update()
}

function render() {
    window.scene = scene
    // raycaster.setFromCamera(mouse, camera);
    // camera.position.x += (mouseX - camera.position.x) * .8;
    // camera.position.y += (- mouseY - camera.position.y) * .8;
    // camera.lookAt(scene.position);
    renderer.render(scene, camera);

}
import SpriteText2D from 'three-text2d'