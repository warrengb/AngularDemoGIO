import * as THREE from 'three';
import { Stage } from '../../gorilla/vision/stage';

export class Cube {
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  canvas!: HTMLCanvasElement;
  cube!: THREE.Mesh;

  init() {
    this.camera = new THREE.PerspectiveCamera(75, 2, .1, 5);
    this.camera.position.z = 2;
    this.canvas = document.querySelector('#cube') ?? new HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.scene.background = null;
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    const threeD = loader.load('assets/images/three/3d.png');
    const texture = loader.load('assets/images/three/gorilla.png');

    const mat = new THREE.MeshPhongMaterial({ color: 0x44aa88, map: texture, transparent: false, opacity: 1 });
    const mat3 = new THREE.MeshPhongMaterial({ color: 0x44aa88, map: threeD, transparent: false, opacity: 1 });
    const materials = [mat3, mat, mat, mat, mat3, mat];

    loadManager.onLoad = () => {
      this.cube = new THREE.Mesh(geometry, materials);
      this.scene.add(this.cube);
      this.animate();
    };
  }

  animate(time = 0) {
    time = Stage.time * 0.0005;
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}
