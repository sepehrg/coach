export interface Powerup {
  id: string;
  title: string;
  advice: string;
  icon: string;
}

export interface PowerupCreateDto {
  title: string;
  advice: string;
  icon: File;
}

export interface PowerupEditDto {
  id: string;
  title?: string;
  advice?: string;
  icon?: File;
}
