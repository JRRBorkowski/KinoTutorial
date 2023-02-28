import { inject, Injectable } from '@angular/core';
import { CanMatch, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectUserRole } from 'src/app/user-data/store/user-data.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanMatch {
  private store = inject(Store)
  
  canMatch(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(selectUserRole).pipe(
      switchMap((result) => {
        console.log(result)
        return of(result === "User" || result === undefined)
      })
    )
  }

}