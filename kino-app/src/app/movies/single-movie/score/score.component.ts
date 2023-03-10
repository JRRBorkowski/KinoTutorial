import { Component, Input } from '@angular/core';
import { Movie, Score } from '../../movies.types';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @Input() movie?: Movie;
  @Input() userId?: number;

  scoring = false;

  showScoring() {
    this.scoring ? (this.scoring = false) : (this.scoring = true);
  }

  getScore(scores?: Score[]) {
    if (!scores || !scores.length) {
      return 0;
    }
    const scoreMean = scores.reduce((a, b) => a + b.score, 0) / scores.length;
    return Math.round(scoreMean);
  }

  submitScore(score: string) {
    if (this.movie && this.userId) {
      this.moviesService.addScore(Number(score), this.userId, this.movie.id);
    }
  }

  constructor(private moviesService: MoviesService) {}
}
