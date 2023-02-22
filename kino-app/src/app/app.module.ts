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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from './user-data/store/user-data.effects';
import { userDataReducer } from './user-data/store/user-data.reducer';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdersComponent } from './reservation/ordered-tickets/ordered-tickets.component';
import { CartComponent } from './reservation/cart/cart.component';




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
    component: AdminComponent
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
    path: 'reservation/:hour/:id',
    component: ReservationComponent,
    children: [
      {
        path: 'form',
        component: FormComponent
      }
    ]
  }
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
    CartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
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
