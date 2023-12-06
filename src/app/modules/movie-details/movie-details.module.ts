import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './container/movie-details/movie-details.component';
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import { CharacterComponent } from './components/character/character.component';


@NgModule({
  declarations: [
    MovieDetailsComponent,
    HeaderDetailsComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule
  ]
})
export class MovieDetailsModule { }
