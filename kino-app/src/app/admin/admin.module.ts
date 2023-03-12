import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin-panel/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { AdminPanelService } from './admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminMovieComponent } from './admin-movie/admin-movie.component';
import { AdminShowingsComponent } from './admin-showings/admin-showings.component';
import { AdminShowingFormComponent } from './admin-showings/admin-showing-form/admin-showing-form.component';
import { NumbersDirective } from '../shared/directive/numbers.directive';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMovieComponent,
    AdminShowingsComponent,
    AdminShowingFormComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: 'admin-movie',
            component: AdminMovieComponent,
          },
          {
            path: 'admin-showing',
            component: AdminShowingsComponent,
          },
        ],
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
  ],
  providers: [AdminPanelService],
})
export default class AdminModule {}
