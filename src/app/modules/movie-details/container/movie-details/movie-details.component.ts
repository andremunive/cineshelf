import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, forkJoin, filter } from 'rxjs';
import { Cast } from 'src/app/core/models/cast.interface';
import { MoviesIdModel } from 'src/app/core/models/movies-id.interface';
import { WatchListModel } from 'src/app/core/models/watch-list.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: MoviesIdModel;
  movieCast!: Cast[];
  movieId: string = '';
  onWatchList: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getMovieById();
  }

  addToWatchList() {
    const movie: WatchListModel = {
      id: this.movieId,
      title: this.movieDetails.title,
      posterPath:
        'https://image.tmdb.org/t/p/w500' + this.movieDetails.poster_path,
    };
    this.storageService.addMovie(movie);
    this.onWatchList = true;
  }

  removeFromWatchList() {
    this.storageService.removeMovieFromWatchList(this.movieId);
    this.onWatchList = false;
  }

  getMovieById() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          this.movieId = id;
          this.onWatchList = this.storageService.existsInWatchList(id);
          return forkJoin({
            movieDetails: this.moviesService.getMovieById(id),
            movieCast: this.moviesService.getCastMovie(id),
          });
        })
      )
      .subscribe(
        (data) => {
          this.movieDetails = data.movieDetails;
          this.movieCast = data.movieCast.cast.filter(
            (member) =>
              member.known_for_department === 'Acting' &&
              member.profile_path !== null
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
