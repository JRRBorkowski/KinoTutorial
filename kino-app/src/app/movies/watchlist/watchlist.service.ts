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

  getWatchlistMovies(id: number | undefined){
    if (id) {
      this.getUser(id).subscribe(({ userWatchlist }) => {
        this.userWatchlist$$.next(userWatchlist);
      });
    } else {
      this.userWatchlist$$.next([])
    }
  }

  removeFromWatchlist(userId: number, movieId: number) {
    this.getUser(userId).subscribe(({ userWatchlist }) => {
      const newWatchlist = userWatchlist.filter((movie) => {
        return movie.id !== movieId;
      });
      console.log(newWatchlist);
      this.http
        .patch(`http://localhost:3000/users/${userId}`, { userWishList: [...newWatchlist] })
        .subscribe(() => {
          this.userWatchlist$$.next(newWatchlist)
        });
    });
  }

  constructor(
    private http : HttpClient
  ) {}
}
