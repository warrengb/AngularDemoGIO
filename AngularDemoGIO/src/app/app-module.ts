import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SceneComponent } from './scene/scene.component';
import { TaskComponent } from './task/task.component';
import { RenderComponent } from './render/render.component';
import { ThreeComponent } from './three/three.component';
import { ConsoleComponent } from './header/console.component'


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule, NoopAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    HeaderComponent,
    HomeComponent,
    SceneComponent,
    TaskComponent,
    RenderComponent,
    ThreeComponent,
    ConsoleComponent,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, data: { animation: 'Home' } },
      { path: 'scene', component: SceneComponent, data: { animation: 'Scene' } },
      { path: 'task', component: TaskComponent, data: { animation: 'Task' } },
      { path: 'render', component: RenderComponent, data: { animation: 'Render' } },
      { path: 'three', component: ThreeComponent, data: { animation: 'Three' } },
      { path: 'header', component: HeaderComponent, data: { animation: 'Header' } }
    ])
  ],
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
