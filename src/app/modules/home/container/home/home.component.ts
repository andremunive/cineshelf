import { Component, OnInit } from '@angular/core';
import { LocalMovieModel } from 'src/app/core/models/local-movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  carouselMovies: LocalMovieModel[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getLocalMovies();
  }

  getLocalMovies() {
    this.moviesService
      .getLocalMovies()
      .subscribe((response: LocalMovieModel[]) => {
        this.carouselMovies = response;
      });
  }
}
