import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './container/home/home.component';

import { JoinGenresPipe } from 'src/app/core/pipes/join-genres.pipe';
import { MovieThumbnailComponent } from './components/movie-thumbnail/movie-thumbnail.component';

@NgModule({
  declarations: [
    CarouselComponent,
    HomeComponent,
    JoinGenresPipe,
    MovieThumbnailComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
