import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './container/home/home.component';

import { JoinGenresPipe } from 'src/app/core/pipes/join-genres.pipe';

@NgModule({
  declarations: [CarouselComponent, HomeComponent, JoinGenresPipe],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
