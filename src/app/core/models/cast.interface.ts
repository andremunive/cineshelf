export interface CastModel {
  cast: Cast[];
  crew: Cast[];
  id: number;
}

export interface Cast {
  adult: boolean;
  cast_id?: number;
  character?: string;
  credit_id: string;
  department?: string;
  gender: number;
  id: number;
  job?: string;
  known_for_department: string;
  name: string;
  order?: number;
  original_name: string;
  popularity: number;
  profile_path: null | string;
}
