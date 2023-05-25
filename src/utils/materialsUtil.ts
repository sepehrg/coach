import { LikedMaterial } from 'entities/Material';

export class MaterialUtils {
  static isYoutubeLink(material: LikedMaterial): boolean {
    if (!material || !material.link) {
      return false;
    }
    return material.link.toLowerCase().indexOf('youtube') > -1;
  }

  static getEmbedLink(material: LikedMaterial): string {
    const yotubeVideoId = material.link.split('=')[1].split('&')[0]; // I think there ar better regex for htis!
    return `https://www.youtube.com/embed/${yotubeVideoId}`;
  }
}
