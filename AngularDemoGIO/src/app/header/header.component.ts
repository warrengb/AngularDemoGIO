import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pie } from '../../gorilla/content/chart/pie';
import { main } from '../../gorilla/content/main';
import { Task } from '../../gorilla/services/task.service';
import { Event, } from '../../gorilla/services/event.service';
import { SliceSelectedEvent } from '../../gorilla/content/events';
import { Color } from '../../gorilla/graphics/color';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { ConsoleComponent } from '../header/console.component';
import { CommonModule } from '@angular/common';
import { Stage } from '../../gorilla/vision/stage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [ConsoleComponent, CommonModule],
  animations: [
    trigger('gorillaHover', [
      state('regular', style({
        transform: 'scale(1)'
      })),
      state('hover', style({
        transform: 'scale(1.2)'
      })),
      transition('regular=>hover', animate('200ms')),
      transition('hover=>regular', animate('300ms'))
    ]),
  ]
})

export class HeaderComponent {
  gorillaHover = 'initial';
  tick!: Task;
  timer = 0;
  splash = true;
  selected = "none";
  pie!: Pie;
  rate = Stage.rate;

  public reset(): void {
    this.title.setTitle("Gorilla IO - Welcome");
    this.pie.reset();
  }

  public fastSplash(): void {
    this.pie.fastSplash();
  }

  select(name:string ) {
    this.pie.change(name);
  }

  sliceObserver(event: SliceSelectedEvent): void {
    this.selected = event.name;
    this.splash = false;
    switch (event.name) {
      case "None": this.router.navigate(['/']); this.splash = true; break;
      case "Home": this.router.navigate(['/home']); break;
      case "Stage": this.router.navigate(['/stage']); break;
      case "Scene": this.router.navigate(['/scene']); break;
      case "Task": this.router.navigate(['/task']); break;
      case "Render": this.router.navigate(['/render']); break;
      case "3D": this.router.navigate(['/three']); break;
    }
  }

  *ticker(): IterableIterator<number> {
    while (true) {
      this.timer++;
      this.rate = Stage.rate;
      yield 0;
    }
  }

  start() {
    let config: [string, number, Color][] = [
      ["Stage", 24, new Color(200, 200, 200)],
      ["Scene", 34, new Color(102, 170, 238)],
      ["Task", 34, new Color(48, 126, 127)], 
      ["Render", 26, new Color(160, 197, 68)],
      ["3D", 20, new Color(172, 200, 220)]
    ];

    let url = this.location.path().split('/');
    let page = (url.length > 1) ? url[1] : "";
    if (page == "three")
      page = "3D";
    this.splash = (page.length == 0);
    this.pie = new Pie(config, page);
    this.tick = Task.run(this.ticker());
    Event.listen(SliceSelectedEvent, (e:any) => this.sliceObserver(e));
    main();
  }

  ngOnInit() {
    this.title.setTitle("Gorilla IO - Welcome");
  }

  ngOnDestroy() {
    this.pie.destroy();
  }

  ngAfterViewInit() {
    console.log('Header view activated.');
    this.start();
    this.ref.detectChanges();
  }

  constructor(
    private title: Title,
    private location: Location,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }
}


