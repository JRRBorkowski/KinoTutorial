import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { LinksComponent } from './links/links.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FooterComponent } from './footer/footer.component';
import { Router, ActivatedRoute, ParamMap, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent    
  },
  {
    path: 'reservation/:id',
    component: ReservationComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    LinksComponent,
    ReservationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
