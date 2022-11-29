import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {path: 'movies', component: MoviesComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: '', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
