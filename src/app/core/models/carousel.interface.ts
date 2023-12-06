export interface CarouselModel {
  sectionTitle: string;
  movies: Movies[];
}

export interface Movies {
  id: string;
  poster: string;
  title: string;
}
