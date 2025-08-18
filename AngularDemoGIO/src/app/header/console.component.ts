import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Display } from '../../gorilla/vision/display';
import { Pointer } from '../../gorilla/services/pointer.service';
import { Render } from '../../gorilla/services/render.service';
import { Color } from '../../gorilla/graphics/color';
import { Sprite } from '../../gorilla/graphics/sprite';
import { Background } from '../../gorilla/graphics/background';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  imports: [DecimalPipe, TitleCasePipe, CommonModule, FormsModule]
})
export class ConsoleComponent {
  @Input()
  name!: string;

  @ViewChild("console", { static: false }) console!: ElementRef;
  _text = "";
  get text() { return this._text; }
  set text(value: string) { this._text = value; }

  paused = false;
  enabled = false;
  display!: Display;
  pointer!: Pointer;
  render!: Render;
  color = new Color(255, 100, 100);
  mode = 0;
  gridBlock = 40;
  spriteColor = "";

  draw(display: Display) {
    if (!this.mode)
      return;

    let context = display.context;
    let thick = display.resolution;
    let alpha = context.globalAlpha;
    context.globalAlpha=0.3;

    context.beginPath();
    context.strokeStyle = "blue";
    context.lineWidth = thick;
    context.rect(-display.canvasHalfWidth + thick, -display.canvasHalfHeight + thick, display.canvas.width - thick * 2, display.canvas.height - thick * 2);
    context.stroke();

    if (this.mode > 1) {

      context.beginPath();
      context.moveTo(-display.canvasHalfWidth, 0);
      context.lineTo(display.canvasHalfWidth, 0);
      context.moveTo(0, -display.canvasHalfHeight);
      context.lineTo(0, display.canvasHalfHeight);
      context.stroke();
    }
    if (this.mode > 2) {
      context.strokeStyle = "green";

      if (this.gridBlock) {
        for (let y = this.gridBlock * display.resolution; y <= display.canvasHalfHeight; y += this.gridBlock * display.resolution) {
          context.moveTo(-display.canvasHalfWidth, -y);
          context.lineTo(display.canvasHalfWidth, -y);
          context.moveTo(-display.canvasHalfWidth, y);
          context.lineTo(display.canvasHalfWidth, y);
        }
        for (let x = this.gridBlock * display.resolution; x <= display.canvasHalfWidth; x += this.gridBlock * display.resolution) {
          context.moveTo(-x, -display.canvasHalfHeight);
          context.lineTo(-x, display.canvasHalfHeight);
          context.moveTo(x, -display.canvasHalfHeight);
          context.lineTo(x, display.canvasHalfHeight);
        }
        context.stroke();
      }
    }
    context.globalAlpha = alpha;
  }

  changeColor() {
    switch (this.spriteColor) {
      case "": this.spriteColor = "black"; break;
      case "black": this.spriteColor = "red"; break;
      case "red": this.spriteColor = "green"; break;
      case "green": this.spriteColor = "blue"; break;
      case "blue": this.spriteColor = "white"; break;
      case "white": this.spriteColor = ""; break;
    }

    Sprite.borderColor = this.spriteColor;
    Background.borderColor = this.spriteColor;
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    console.log('Console view activated.');
  }

  open() {
    if (!Display.available(this.name))
      return;
    this.enabled = true;
    this.display = Display.get(this.name);
    this.pointer = new Pointer(this.display);
    this.render = new Render(r => this.draw(r), this.display, undefined, true, 100);
    this.scrollToBottom();
  }

  close() {
    this.enabled = false;
  }

  clear() {
    this.text = "";
  }

  services() {
    this.text += "\n[SERVICES]\n";
    this.scrollToBottom();
  }

  help() {
    this.text += "\n[CONSOLE] " + this.name + "\n" +
      "The Console displays internal messaging output and display states while program is running.\n" +
      "Toolbar functions respectfully: [close console], [this information], [clear screen], [dump service states], [display outlines toggle], 'display name - size - pointer coordinates', [pause|resume autoscrolling]\n"
    "\n\n";
    this.scrollToBottom();
  }

  ngOnInit() {
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.paused || !this.console || !this.console.nativeElement)
      return;
    setTimeout(() => {
      this.console.nativeElement.scrollTop = this.console.nativeElement.scrollHeight;
    }, 100);
  }

  grid(): void {
    if (this.mode == 3)
      this.mode = 0;
    else
      this.mode++;
  }

  hook(me: any, source: any, method: string) {
    let original = source[method];
    source[method] = function () {
      var message = Array.prototype.slice.apply(arguments).join(' ');
      me.text += ">" + message + "\n";
      me.scrollToBottom();
      if (original.apply) {
        original.apply(console, arguments);
      } else {
        original(message);
      }
    }
  }

  constructor() {
    if (window.console) {
      this.hook(this, window.console, 'log');
      this.hook(this, window.console, 'warn');
      this.hook(this, window.console, 'error');
      this.hook(this, window.console, 'debug');
    }
  }
}
