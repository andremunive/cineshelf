import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './container/movie-details/movie-details.component';
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import { CharacterComponent } from './components/character/character.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    HeaderDetailsComponent,
    CharacterComponent,
  ],
  imports: [CommonModule, MovieDetailsRoutingModule, YouTubePlayerModule],
})
export class MovieDetailsModule {}
