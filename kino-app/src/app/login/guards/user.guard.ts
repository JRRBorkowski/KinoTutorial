import { inject, Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectUserRole } from 'src/app/user-data/store/user-data.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanMatch {
  private store = inject(Store);
  private router = inject(Router);

  canMatch():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectUserRole).pipe(
      switchMap((result) => {
        if (result === 'User' || result === undefined)
          this.router.navigate(['admin']);
        return of(result === 'User' || result === undefined);
      })
    );
  }
}
