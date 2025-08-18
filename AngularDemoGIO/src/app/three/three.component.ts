import { Component } from '@angular/core';
import { ThreeScene } from '../../gorilla/scenes/three/three.scene';
import { Scene } from '../../gorilla/services/scene.service';
import { Display } from '../../gorilla/vision/display';
import { Title } from '@angular/platform-browser';
import { Cube } from './cube';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'three',
  templateUrl: './three.component.html',
  imports: [ConsoleComponent, CommonModule]
})

export class ThreeComponent {
  scene: Scene | undefined = undefined;
  cube = new Cube();

  ngAfterViewInit() {
    console.log('3D view activated.');
    this.cube.init();
    setTimeout(() => { this.scene = Scene.activate(ThreeScene); }, 100);
  }

  ngOnInit() {
    this.title.setTitle("Gorilla IO - 3D");
  }

  ngOnDestroy() {
    Display.destroy('three');
    Scene.destroy();
    if (this.scene)
      this.scene.destroy();

  }
  constructor(private title: Title) {
  }
}


