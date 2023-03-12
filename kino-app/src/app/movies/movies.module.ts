import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { UserGuard } from '../login/guards/user.guard';
import { FormComponent } from '../reservation/form/form.component';
import { OrderDetailsComponent } from '../reservation/order-details/order-details.component';
import { OrderService } from '../reservation/order-details/order.service';
import { OrdersComponent } from '../reservation/ordered-tickets/ordered-tickets.component';
import { CartService } from '../reservation/ordered-tickets/ordered-tickets.service';
import { ReservationComponent } from '../reservation/reservation.component';
import { ReservationService } from '../reservation/reservation.service';
import { SuccesspageComponent } from '../reservation/successpage/successpage.component';
import { NumbersDirective } from '../shared/directive/numbers.directive';
import { UserDataService } from '../user-data/user-data.service';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';
import { ScoreComponent } from './single-movie/score/score.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchlistService } from './watchlist/watchlist.service';

@NgModule({
  declarations: [
    MoviesComponent,
    WatchlistComponent,
    SingleMovieComponent,
    OrdersComponent,
    ReservationComponent,
    FormComponent,
    OrderDetailsComponent,
    SuccesspageComponent,
    ScoreComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: ':date',
        component: MoviesComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'watchlist',
        component: WatchlistComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'reservation/:hour/:id/:dayIndex',
        component: ReservationComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'reservation/:hour/:id/:dayIndex/form',
        component: FormComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'orderdetails/:id',
        component: OrderDetailsComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'successpage/:orderId',
        component: SuccesspageComponent,
        canActivate: [UserGuard],
      },
    ]),
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    NumbersDirective,
    MatSliderModule,
  ],
  providers: [
    MoviesService,
    CartService,
    OrderService,
    UserDataService,
    WatchlistService,
    ReservationService,
  ],
})
export default class AdminModule {}
