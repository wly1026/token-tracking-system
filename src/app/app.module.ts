import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayingComponent } from './components/playing/playing.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {path: 'login', component: LoginComponent},
//   {path: ':userId/playing', component: PlayingComponent},
//   {path: '*', redirectTo: '/login', pathMatch: 'full'}
// ];

@NgModule({
  declarations: [
    AppComponent,
    PlayingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
