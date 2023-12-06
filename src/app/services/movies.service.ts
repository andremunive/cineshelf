import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { LocalMovieModel } from '../core/models/local-movie.interface';
import { environment } from 'src/environments/environment';
import { MoviesModel } from '../core/models/movies.interface';
import { MoviesByDateModel } from '../core/models/movies-date.interface';
import { MoviesIdModel } from '../core/models/movies-id.interface';
import { CastModel } from '../core/models/cast.interface';

interface dates {
  initialDate: string;
  endDate: string;
}
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getLocalMovies(): Observable<LocalMovieModel[]> {
    return this.http.get<LocalMovieModel[]>('/assets/build/db/movies.json');
  }

  getMovieByGenres(): Observable<MoviesModel[]> {
    const genreIds: string[] = ['28', '35', '27', '878'];
    const requests = genreIds.map((id) =>
      this.http.get<MoviesModel>(
        `${environment.URL_BASE}genre/${id}/movies?api_key=${environment.tmdbKey}`
      )
    );

    return forkJoin(requests);
  }

  getMoviesByYear(): Observable<MoviesByDateModel[]> {
    const dates: dates[] = [
      {
        initialDate: '2020-01-01',
        endDate: '2023-12-31',
      },
      {
        initialDate: '2016-01-01',
        endDate: '2019-12-31',
      },
      {
        initialDate: '2012-01-01',
        endDate: '2015-12-31',
      },
      {
        initialDate: '2008-01-01',
        endDate: '2011-12-31',
      },
    ];

    const request = dates.map((requests) =>
      this.http.get<MoviesByDateModel>(
        `https://api.themoviedb.org/3/discover/movie?api_key=${environment.tmdbKey}&sort_by=release_date.desc&primary_release_date.gte=${requests.initialDate}&primary_release_date.lte=${requests.endDate}`
      )
    );

    return forkJoin(request);
  }

  getMovieById(id: string): Observable<MoviesIdModel> {
    const url = `${environment.URL_BASE}movie/${id}?&append_to_response=videos&api_key=${environment.tmdbKey}`;
    return this.http.get<MoviesIdModel>(url);
  }

  getCastMovie(id: string): Observable<CastModel> {
    const url = `${environment.URL_BASE}movie/${id}/credits?api_key=${environment.tmdbKey}`;
    return this.http.get<CastModel>(url);
  }
}
