import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Display } from '../../gorilla/vision/display';
import { Scene } from '../../gorilla/services/scene.service';
import { HorseScene } from '../../gorilla/scenes/main/horse.scene';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ConsoleComponent, CommonModule],
  animations: [
    trigger('hover', [
      state('regular', style({
        transform: 'scale(1) translateX(0%)'

      })),
      state('hover', style({
        transform: 'scale(6) translateX(40%)'
      })),
      transition('regular=>hover', animate('200ms')),
      transition('hover=>regular', animate('300ms'))
    ]),
  ]
})

export class HomeComponent {
  flipoutHover = 'initial';
  scene: HorseScene | undefined = undefined;
  audioOn = false;
  hover: any;

  toggleAudio() {
    this.scene?.mute(this.audioOn);
    this.audioOn = !this.audioOn;
  }

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
