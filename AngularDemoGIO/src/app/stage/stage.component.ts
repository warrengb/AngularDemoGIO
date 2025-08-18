import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'stage',
  templateUrl: './stage.component.html'
})

export class StageComponent {

  ngAfterViewInit() {
    console.log('Stage view activated.');
  }

  ngOnInit() {
    this.title.setTitle("Gorilla IO - Stage");
  }

  constructor(private title: Title) {
  }
}


