"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = void 0;
var THREE = require("three");
var stage_1 = require("../../gorilla/vision/stage");
var Cube = /** @class */ (function () {
    function Cube() {
    }
    Cube.prototype.init = function () {
        var _this = this;
        this.camera = new THREE.PerspectiveCamera(75, 2, .1, 5);
        this.camera.position.z = 2;
        this.canvas = document.querySelector('#cube');
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.scene = new THREE.Scene();
        this.scene.background = null;
        var light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-1, 2, 4);
        this.scene.add(light);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var loadManager = new THREE.LoadingManager();
        var loader = new THREE.TextureLoader(loadManager);
        var threeD = loader.load('assets/images/three/3d.png');
        var texture = loader.load('assets/images/three/gorilla.png');
        var mat = new THREE.MeshPhongMaterial({ color: 0x44aa88, map: texture, transparent: false, opacity: 1 });
        var mat3 = new THREE.MeshPhongMaterial({ color: 0x44aa88, map: threeD, transparent: false, opacity: 1 });
        var materials = [mat3, mat, mat, mat, mat3, mat];
        loadManager.onLoad = function () {
            _this.cube = new THREE.Mesh(geometry, materials);
            _this.scene.add(_this.cube);
            //this.mesh = new THREE.Mesh(this.geometry, materials);
            //this.scene.add(this.mesh);
            _this.animate();
        };
    };
    Cube.prototype.animate = function (time) {
        if (time === void 0) { time = 0; }
        time = stage_1.Stage.time * 0.0005;
        this.cube.rotation.x = time;
        this.cube.rotation.y = time;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    };
    return Cube;
}());
exports.Cube = Cube;
//# sourceMappingURL=cube.js.map