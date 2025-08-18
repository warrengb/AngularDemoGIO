import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Gorilla IO');
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  select(name: string) {
    this.header?.select(name);
  }
}
