import { inject, Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectUserRole } from 'src/app/user-data/store/user-data.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectUserRole).pipe(
      switchMap((result) => {
        if (result === 'Admin') {
          this.router.navigate(['admin']);
        }
        return of(result === 'User' || result === undefined);
      })
    );
  }
}
