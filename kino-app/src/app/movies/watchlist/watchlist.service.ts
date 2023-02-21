import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { MoviesFromDb, User } from 'src/app/types';


@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private userWatchlist$$ = new BehaviorSubject<MoviesFromDb[]>([]);

  get userWatchlist$() {
    return this.userWatchlist$$.asObservable();
  }

  getUser(id: number) {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  getWishlistMovies(id: number){
    this.getUser(id).subscribe(({ userWatchlist }) => {
      this.userWatchlist$$.next(userWatchlist);
    });
  }

  constructor(
    private http : HttpClient
  ) {}
}
