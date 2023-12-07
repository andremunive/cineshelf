import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from 'src/app/core/models/movies-id.interface';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.scss'],
})
export class HeaderDetailsComponent implements OnInit {
  notFoundPath = '../../../../../assets/build/images/png/404.png';
  @Input() title: string = '';
  @Input() duration: string = '';
  @Input() moviePoster: string | null = null;
  @Input() movieBackDrop: string | null = null;
  @Input() genres: Genre[] = [];
  @Input() score: string = '';
  @Input() onWatchList: boolean = false;
  @Output() addToWatchList: EventEmitter<boolean> = new EventEmitter();
  @Output() removeFromWatchList: EventEmitter<boolean> = new EventEmitter();
  @Input() videoId?: string = 'mkkgVEuEHKY';
  showPlayer: boolean = false;

  ngOnInit(): void {}

  addToWatchListAction() {
    this.addToWatchList.emit();
  }
  removeFromWatchListAction() {
    this.removeFromWatchList.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    this.showPlayer = false;
  }

  onPlayerClick(event: MouseEvent): void {
    console.log('HERE2');
    // Esto previene que el evento de clic se propague al contenedor
    event.stopPropagation();
  }
}
