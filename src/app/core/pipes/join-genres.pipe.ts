import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinGenres' })
export class JoinGenresPipe implements PipeTransform {
  transform(genres: string[]): string {
    return genres.join(', ');
  }
}
