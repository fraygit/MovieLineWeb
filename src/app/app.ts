import { Component, inject, signal, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MovieLineService, MovieLine } from './services/movie-line.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private movieLineService = inject(MovieLineService);
  private platformId = inject(PLATFORM_ID);

  movieLines = signal<MovieLine[]>([]);
  loading = signal(false);
  error = signal('');
  flippedCards = signal<Set<number>>(new Set());

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMovieLines();
    }
  }

  loadMovieLines() {
    this.flippedCards.set(new Set());
    this.loading.set(true);
    this.error.set('');
    this.movieLineService.getMovieLines().subscribe({
      next: lines => {
        this.movieLines.set(lines);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load movie lines. Check your API key in src/environments/environment.ts.');
        this.loading.set(false);
      }
    });
  }

  toggleCard(index: number) {
    this.flippedCards.update(set => {
      const next = new Set(set);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }
}
