import { NgModule } from '@angular/core';
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
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin/admin.component';



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
    AdminComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
