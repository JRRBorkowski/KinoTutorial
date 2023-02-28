import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { LinksComponent } from './links/links.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FooterComponent } from './footer/footer.component';
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
import { AdminComponent } from './admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from './user-data/store/user-data.effects';
import { userDataReducer } from './user-data/store/user-data.reducer';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdersComponent } from './reservation/ordered-tickets/ordered-tickets.component';
import { CartComponent } from './reservation/cart/cart.component';
import { AdminMovieComponent } from './admin/admin-movie/admin-movie.component';
import { AdminShowingsComponent } from './admin/admin-showings/admin-showings.component';
import { ScoreComponent } from './movies/single-movie/score/score.component';
import { AdminShowingFormComponent } from './admin/admin-showings/admin-showing-form/admin-showing-form.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminGuard } from './login/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent    
  },
  {
    path: 'login',
    component: LoginComponent   
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
      path: 'admin-movie',
      component: AdminMovieComponent
    },
    {
      path: 'admin-showing',
      component: AdminShowingsComponent
    }
    ],
    canMatch: [AdminGuard]
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'reservation/:hour/:id/:dayIndex',
    component: ReservationComponent
  },
  {
    path: 'reservation/:hour/:id/:dayIndex/form',
    component: FormComponent
  },
  { path: 'orderDetails/:id', component: OrderDetailsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    LinksComponent,
    ReservationComponent,
    FooterComponent,
    FormComponent,
    SingleMovieComponent,
    AdminComponent,
    WatchlistComponent,
    OrdersComponent,
    CartComponent,
    AdminMovieComponent,
    AdminShowingsComponent,
    ScoreComponent,
    AdminShowingFormComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
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
    StoreModule.forRoot({userData : userDataReducer}),
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
  bootstrap: [AppComponent]
})
export class AppModule { }
