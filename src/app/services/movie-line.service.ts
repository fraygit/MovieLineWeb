import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovieLine {
  line: string;
  movie: string;
  character: string;
  year: number;
}

@Injectable({ providedIn: 'root' })
export class MovieLineService {
  private http = inject(HttpClient);

  getMovieLines(): Observable<MovieLine[]> {
    const prompt = `Generate 10 random famous movie lines from different decades and genres.
Return ONLY a valid JSON array with no markdown, no code blocks, no extra text.
Each object must have exactly these fields:
- "line": the exact famous quote
- "movie": the film title
- "character": the character who said it
- "year": the film's release year as a number`;

    return this.http.post<any>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1
      },
      {
        headers: {
          Authorization: `Bearer ${environment.openAiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      map(response => {
        const content: string = response.choices[0].message.content;
        const cleaned = content.replace(/```json|```/g, '').trim();
        return JSON.parse(cleaned) as MovieLine[];
      })
    );
  }
}
