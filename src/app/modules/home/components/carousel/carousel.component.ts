import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalMovieModel } from 'src/app/core/models/local-movie.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() movies: LocalMovieModel[] = [];
  @Input() indicators: boolean = true;
  @Input() autoSlide: boolean = true;
  @Input() slideInterval: number = 5000;
  selectedIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextImage();
    }, this.slideInterval);
  }

  onNextImage(): void {
    if (this.selectedIndex === this.movies.length - 1) {
      this.selectedIndex = 0;
      return;
    }
    this.selectedIndex++;
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  goToDetails(id: string) {
    this.router.navigate(['/movie/details', id]);
  }
}
