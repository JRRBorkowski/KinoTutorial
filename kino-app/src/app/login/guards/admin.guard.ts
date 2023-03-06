import { Injectable, inject } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, switchMap, of } from 'rxjs';
import { selectUserRole } from 'src/app/user-data/store/user-data.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanMatch {
  private store = inject(Store);
  private router = inject(Router);

  canMatch():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectUserRole).pipe(
      filter((userType) => userType !== null),
      switchMap((result) => {
        if (result !== 'Admin') this.router.navigate(['']);
        return of(result === 'Admin');
      })
    );
  }
}
