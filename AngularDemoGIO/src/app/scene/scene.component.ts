import { Component } from '@angular/core';
import { Scene } from '../../gorilla/services/scene.service';
import { BeachScene } from '../../gorilla/scenes/scene/beach.scene';
import { WoodsScene } from '../../gorilla/scenes/scene/woods.scene';
import { Display } from '../../gorilla/vision/display';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  imports: [ConsoleComponent, CommonModule] 
})

export class SceneComponent {
  loaded = false;
  get current() { return Scene.current("level"); }

  get next() {
    let cur = this.current;
    if (!cur)
      return null;
    return (cur.name == "beach") ? "Woods":"Beach";
  }

  public activate(): void  {
    Scene.activate((this.next == "Beach") ? BeachScene : WoodsScene);
  }

  ngAfterViewInit() {
    setTimeout(() => { Scene.activate(BeachScene); this.loaded = true;}, 100);
  }

  ngOnInit() {
    this.title.setTitle("Gorilla IO - Scene");
  }

  ngOnDestroy() {
    this.current?.destroy();
    Display.destroy('scene');
    Scene.destroy();
  }

  constructor(private title: Title) {
  }
}


