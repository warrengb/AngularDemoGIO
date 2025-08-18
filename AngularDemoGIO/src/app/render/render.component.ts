import { Component } from '@angular/core';
import { RacerScene } from '../../gorilla/scenes/scene/racer.scene';
import { Scene } from '../../gorilla/services/scene.service';
import { Display } from '../../gorilla/vision/display';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'render',
  templateUrl: './render.component.html',
  imports: [ConsoleComponent, CommonModule]
})

export class RenderComponent {
  scene: Scene | undefined = undefined;
  ngAfterViewInit() {
    console.log('Render view activated.');
    setTimeout(() => { this.scene = Scene.activate(RacerScene); }, 100);
  }

  ngOnInit() {
    this.title.setTitle("Gorilla IO - Render");
  }

  ngOnDestroy() {
    Display.destroy('racer');
    Scene.destroy();
    if (this.scene)
      this.scene.destroy();

  }
  constructor(private title: Title) {
  }
}


