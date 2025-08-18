import { Render } from '../../services/render.service';
import { Display } from '../../vision/display';
import { Scene } from '../../services/scene.service';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Keyboard } from '../../services/keyboard.service';
import { Pointer } from '../../services/pointer.service';
import { Stage } from '../../vision/stage';

export class CubeScene extends Scene {
  display = Display.get("three");
  pointer = new Pointer(this.display);
  render!: Render;

  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  canvas!: HTMLCanvasElement;
  cube!: THREE.Mesh;
  ready = false;
  buffer!: HTMLCanvasElement;

  // LIGHTS
  pointLight1 = new THREE.PointLight(0xffffff, 1.5, 800);
  pointLight2 = new THREE.PointLight(0xffffff, 1.5, 800);
  ambientLight = new THREE.AmbientLight(0xE686E6, 1.0);
  spotLight = new THREE.SpotLight(0x2866EF);
  directLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  pointLight = new THREE.PointLight(0xFFFFFF,2);

  init() {
    this.camera = new THREE.PerspectiveCamera(75, 2, .1, 5);
    this.camera.position.z = 2;
    this.buffer = <HTMLCanvasElement>document.createElement('canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.buffer, alpha: true, antialias: true });
    this.resize();

    this.scene = new THREE.Scene();
    this.scene.background = null;
    this.directLight.intensity = 100;
    this.directLight.position.set(1, 0, 1);
    this.ambientLight.intensity = 100;
    this.ambientLight.position.set(0, 2, 0);
      

    this.scene.add(this.directLight);
    this.scene.add(this.ambientLight);
    const geometry = new THREE.BoxGeometry(.5, .5, .5);
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
      this.render = new Render(d => this.draw(), this.display, r => this.resize(), false);
      this.ready = true;

      this.pointLight.position.set(1, 2, 4);
      this.scene.add(this.pointLight);
      //this.pointLight.position.set(0, 300, 200);




      //this.spotLight.position.set(-1, 2, 4);
      //this.spotLight.castShadow = true;

      //this.spotLight.shadow.mapSize.width = 1024;
      //this.spotLight.shadow.mapSize.height = 1024;
      //this.spotLight.shadow.camera.near = 500;
      //this.spotLight.shadow.camera.far = 4000;
      //this.spotLight.shadow.camera.fov = 30;
      //this.scene.add(this.spotLight);

      //this.pointLight1.position.set(-1, 2, 4);
      //this.pointLight2.position.set(-1, 2, 4);
      //this.scene.add(this.pointLight1);
      //this.scene.add(this.pointLight2);
      //this.ambientLight.position.set(-1, 2, 4);
      //this.scene.add(this.ambientLight);  
    };
  }

  resize() {
    this.renderer.setSize(this.display.width, this.display.height)
    this.buffer.width = this.display.width;
    this.buffer.height = this.display.height;
  }

  draw() {
    let time = Stage.time * 0.0005;
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
    this.renderer.render(this.scene, this.camera);
    this.display.context.drawImage(this.buffer, 0, 0);
  }

  *run(): IterableIterator<number> {
    console.log("three run");
    
    while (true) {
      if (Keyboard.down) {
        if (Keyboard.key('Z'.charCodeAt(0))) {
          this.display.fullscreen = true;
        }
        else
          if (Keyboard.key('X'.charCodeAt(0))) {
            this.display.fullscreen = false;
          }
      }
      yield 50;
    }
  }

  destroy() {
    if (this.render)
      this.render.remove();
  }

  *enter(): IterableIterator<number> {
    console.log("3D enter");
    this.init();
    while (!this.ready)
      yield 200;
  }

  *exit(): IterableIterator<number> {
    this.destroy();
    console.log("three exit");
  }

  constructor(args: string[] = []) {
    super("three");
    this.initializeTasks(this.run(), this.enter(), this.exit());
  }
}
