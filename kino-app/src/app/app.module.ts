import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { LinksComponent } from './shared/links/links.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './reservation/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from './user-data/store/user-data.effects';
import { userDataReducer } from './user-data/store/user-data.reducer';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdersComponent } from './reservation/ordered-tickets/ordered-tickets.component';
import { CartComponent } from './reservation/cart/cart.component';
import { ScoreComponent } from './movies/single-movie/score/score.component';
import { OrderDetailsComponent } from './reservation/order-details/order-details.component';
import { AdminGuard } from './login/guards/admin.guard';
import { SuccesspageComponent } from './reservation/successpage/successpage.component';
import { UserGuard } from './login/guards/user.guard';
import { BlikComponent } from './blik/blik.component';
import { NumbersDirective } from './shared/directive/numbers.directive';


const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module'),
    canMatch: [AdminGuard]
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'reservation/:hour/:id/:dayIndex',
    component: ReservationComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'reservation/:hour/:id/:dayIndex/form',
    component: FormComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'orderdetails/:id',
    component: OrderDetailsComponent,
    canMatch: [UserGuard],
  },
  {
    path: 'successpage/:orderId',
    component: SuccesspageComponent,
    canMatch: [UserGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    LinksComponent,
    ReservationComponent,
    FormComponent,
    SingleMovieComponent,
    WatchlistComponent,
    OrdersComponent,
    CartComponent,
    ScoreComponent,
    OrderDetailsComponent,
    SuccesspageComponent,
    BlikComponent,
  ],
  imports: [
    BrowserModule,
    FooterComponent,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NumbersDirective,
    StoreModule.forRoot({ userData: userDataReducer }),
    EffectsModule.forRoot([UserDataEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
