import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalMovieModel } from '../core/models/local-movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getLocalMovies(): Observable<LocalMovieModel[]> {
    return this.http.get<LocalMovieModel[]>('/assets/build/db/movies.json');
  }
}
