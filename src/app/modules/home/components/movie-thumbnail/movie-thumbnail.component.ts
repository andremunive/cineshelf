import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CarouselModel } from 'src/app/core/models/carousel.interface';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.scss'],
})
export class MovieThumbnailComponent {
  emptyCarousel: CarouselModel = {
    sectionTitle: '',
    movies: [],
  };

  @Input() moviesToShow: CarouselModel = this.emptyCarousel;
  @ViewChild('containerCarousel') fila!: ElementRef<HTMLDivElement>;

  leftScroll() {
    this.fila.nativeElement.scrollLeft -= this.fila.nativeElement.offsetWidth;
  }
  rightScroll() {
    this.fila.nativeElement.scrollLeft += this.fila.nativeElement.offsetWidth;
  }
}
