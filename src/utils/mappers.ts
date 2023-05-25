import { LikedMaterial, MaterialLink } from '../entities/Material';

export const mapMaterialToLikedMaterial = (material: MaterialLink): LikedMaterial =>
  ({
    id: material.id,
    link: material.link,
    name: material.name,
    tags: material.tags,
    sourceType: material.sourceType,
    learningType: material.learningType,
    iframe: material.iframe,
    isLiked: material.isLiked,
    isCustom: material.isCustom,
  } as LikedMaterial);
