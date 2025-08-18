import { Component } from '@angular/core';
import { Display } from '../../gorilla/vision/display';
import { Scene } from '../../gorilla/services/scene.service';
import { HorseScene } from '../../gorilla/scenes/main/horse.scene';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  imports: [ConsoleComponent, CommonModule]
})

export class TaskComponent {

  scene!: HorseScene | undefined;
  audioOn = false;

  toggleAudio() {
    this.scene?.mute(this.audioOn);
    this.audioOn = !this.audioOn;
  }

  ngOnDestroy() {
    Display.destroy('horse');
    this.scene?.destroy();
    Scene.destroy();
  }

  ngAfterViewInit() {
    console.log('Task view activated.');
    setTimeout(() => {
      this.scene = Scene.activate(HorseScene);
      this.scene?.mute(true);
    }, 100);
  }

  ngOnInit() {   
    this.title.setTitle("Gorilla IO - Task");
  }

  constructor(private title: Title) {
  }
}


