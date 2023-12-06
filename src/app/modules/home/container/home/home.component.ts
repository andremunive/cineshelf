import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { FilterEnum } from 'src/app/core/enums/filter.enum';
import { CarouselModel, Movies } from 'src/app/core/models/carousel.interface';
import { LocalMovieModel } from 'src/app/core/models/local-movie.interface';
import {
  MoviesByDateModel,
  Results,
} from 'src/app/core/models/movies-date.interface';
import { MoviesModel, Result } from 'src/app/core/models/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AppState } from 'src/app/state/app.state';
import { selectFilterOption } from 'src/app/state/selectors/filter.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filter$: Observable<any> = new Observable();
  filter: any;
  carouselMovies: LocalMovieModel[] = [];
  private genresMap: { [key: number]: string } = {
    28: 'Action',
    35: 'Comedy',
    27: 'Horror',
    878: 'Sci-Fi',
  };
  nameTitles = ['A - G', 'H - M', 'N - S', 'T - Z'];
  datesTitle = ['2020 - 2023', '2016 - 2019', '2012 - 2015', '2008 - 2011'];
  sliderMovies: CarouselModel[] = [];

  constructor(
    private moviesService: MoviesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadDataByFilter();
    // this.getMovies();
  }

  loadDataByFilter() {
    this.filter$ = this.store.select(selectFilterOption);
    this.filter$.subscribe((res) => {
      this.getMovies(res);
    });
  }

  getGenreTitle(genreCode: number): string {
    return this.genresMap[genreCode];
  }

  createSliderMovies(moviesArray: MoviesModel[]) {
    this.sliderMovies = [];
    moviesArray.forEach((category) => {
      const movies: Movies[] = category.results.map((movie: Result) => ({
        id: movie.id.toString(),
        poster:
          movie.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '../../../../../assets/build/images/png/404.png',
        title: movie.title,
      }));
      this.sliderMovies.push({
        sectionTitle: this.getGenreTitle(category.id),
        movies: movies,
      });
    });
  }

  createSliderMoviesByDate(moviesArray: MoviesByDateModel[]) {
    this.sliderMovies = [];
    let index = 0;
    moviesArray.forEach((date) => {
      const movies: Movies[] = date.results.map((movie: Results) => ({
        id: movie.id.toString(),
        poster:
          movie.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '../../../../../assets/build/images/png/404.png',
        title: movie.title,
      }));
      this.sliderMovies.push({
        sectionTitle: this.datesTitle[index],
        movies: movies,
      });
      index++;
    });
    console.log('CAROUSEL => ', this.sliderMovies);
  }

  getMovies(filter: string) {
    switch (filter) {
      case FilterEnum.genre:
        forkJoin({
          localMovies: this.moviesService.getLocalMovies(),
          movies: this.moviesService.getMovieByGenres(),
        }).subscribe(({ localMovies, movies }) => {
          this.carouselMovies = localMovies;
          this.createSliderMovies(movies);
        });
        break;
      case FilterEnum.date:
        forkJoin({
          localMovies: this.moviesService.getLocalMovies(),
          movies: this.moviesService.getMoviesByYear(),
        }).subscribe(({ localMovies, movies }) => {
          console.log('MOVIES => ', movies);
          this.carouselMovies = localMovies;
          this.createSliderMoviesByDate(movies);
        });
        break;
    }
  }
}
