import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { Movie, User } from 'src/app/types';

//todo DB_PATH as an env variable http://localhost...

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private userWatchlist$$ = new BehaviorSubject<Movie[]>([]);

  get userWatchlist$() {
    return this.userWatchlist$$.asObservable();
  }

  getUser(id: number) {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }


  //todo maybe add a "DeleteWatchlistMovies" function instead of trigerring such behaviour with undefined argument.
  getWatchlistMovies(id: number | undefined){
    if (id) {
      this.getUser(id).subscribe(({ userWatchlist }) => {
        this.userWatchlist$$.next(userWatchlist);
      });
    } else {
      this.userWatchlist$$.next([])
    }
  }

  addToWatchlist(id : number ,movie : Movie) {
    return this.http.post<Movie>(`http://localhost:3000/users/${id}/userWatchlist`, movie);
  }

  removeFromWatchlist(userId: number, movieId: number) {
    this.getUser(userId).subscribe(({ userWatchlist }) => {
      const newWatchlist = userWatchlist.filter((movie) => {
        return movie.id !== movieId;
      });
      console.log(newWatchlist);
      this.http
        .patch(`http://localhost:3000/users/${userId}`, { userWatchlist: [...newWatchlist] })
        .subscribe(() => {
          this.userWatchlist$$.next(newWatchlist)
        });
    });
  }

  constructor(
    private http : HttpClient
  ) {}
}
