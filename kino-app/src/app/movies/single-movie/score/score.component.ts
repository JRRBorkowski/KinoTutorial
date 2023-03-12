import { Component, Input, OnInit } from '@angular/core';
import { Movie, Score } from '../../movies.types';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() movie?: Movie;
  @Input() userId?: number;

  scoring = false;
  score?: number;
  userScored = false;

  showScoring() {
    this.scoring ? (this.scoring = false) : (this.scoring = true);
  }

  getScore(scores?: Score[]) {
    if (!scores || !scores.length) {
      this.score = 0;
    } else {
      const scoreMean = scores.reduce((a, b) => a + b.score, 0) / scores.length;
      this.score = Math.round(scoreMean);
    }
  }

  checkUser() {
    this.movie?.scores.forEach((score) => {
      if (score.userId === this.userId) {
        return (this.userScored = true);
      } else {
        return (this.userScored = false);
      }
    });
  }

  submitScore(score: string) {
    if (this.movie && this.userId) {
      this.moviesService.addScore(Number(score), this.userId, this.movie.id);
    }
  }

  ngOnInit(): void {
    this.getScore(this.movie?.scores);
    this.checkUser();
  }

  constructor(private moviesService: MoviesService) {}
}
