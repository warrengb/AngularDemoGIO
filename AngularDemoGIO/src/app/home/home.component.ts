import { Component } from '@angular/core';
import { Display } from '../../gorilla/vision/display';
import { Scene } from '../../gorilla/services/scene.service';
import { HorseScene } from '../../gorilla/scenes/main/horse.scene';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ConsoleComponent, CommonModule]
})

export class HomeComponent {
  flipoutHover = 'initial';
  scene: HorseScene | undefined = undefined;
  hover: any;

  ngOnDestroy() {
    Display.destroy('horse');
    this.scene?.destroy();
    Scene.destroy();
  }

  ngOnInit() {
    console.log('Home view activated.');
    this.title.setTitle("Gorilla IO - Home");
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scene = Scene.activate(HorseScene);
      this.scene?.mute(true);
    }, 100);
  }

  constructor(private title: Title) {
  }
}
