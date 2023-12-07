import { Component, OnInit } from '@angular/core';
import { WatchListModel } from 'src/app/core/models/watch-list.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  watchListMovies: WatchListModel[] = [];
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.getWatchList();
  }

  removeFromWatchList(id: string) {
    this.storageService.removeMovieFromWatchList(id);
    this.getWatchList();
  }

  getWatchList() {
    this.watchListMovies = [];
    this.watchListMovies = this.storageService.getWatchList();
  }
}
