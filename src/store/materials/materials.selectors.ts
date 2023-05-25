import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';

export const materialsSelector = (state: RootState) => state.materials;
export const selectedMaterialSelector = (state: RootState) => state.materials.selectedItem;
export const materialsHistorySelector = (state: RootState) => state.materials.materialsHistory;
const materialsLinksFilteredByTypeSelector = createSelector(
  (state: RootState) => state.materials.allMaterialsLinks,
  (state: RootState) => state.materials.filteredMaterialType,
  (materialsLinks, filteredMaterialType) =>
    filteredMaterialType
      ? materialsLinks.filter((link) => link.learningType === filteredMaterialType)
      : materialsLinks,
);
export const materialsLinksSelector = createSelector(
  materialsLinksFilteredByTypeSelector,
  (state: RootState) => state.materials.page,
  (materialsLinks, page) => materialsLinks.slice((page - 1) * 10, page * 10),
);
export const materialsPageCountSelector = createSelector(
  materialsLinksFilteredByTypeSelector,
  (links) => Math.ceil(links.length / 10),
);
