import { Injectable } from '@angular/core';
import { WatchListModel } from '../core/models/watch-list.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private watchListKey = 'watchList';

  addMovie(movie: WatchListModel) {
    const watchList = this.getWatchList();
    watchList.push(movie);
    localStorage.setItem(this.watchListKey, JSON.stringify(watchList));
  }

  getWatchList(): WatchListModel[] {
    const watchListJSON = localStorage.getItem(this.watchListKey);
    if (watchListJSON) {
      return JSON.parse(watchListJSON);
    }
    return [];
  }

  existsInWatchList(movieId: string): boolean {
    const watchList = this.getWatchList();
    return watchList.some((movie) => movie.id === movieId);
  }

  removeMovieFromWatchList(movieId: string) {
    let watchList = this.getWatchList();
    watchList = watchList.filter((movie) => movie.id !== movieId);
    localStorage.setItem(this.watchListKey, JSON.stringify(watchList));
  }
}
