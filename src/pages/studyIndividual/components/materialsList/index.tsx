import Grid from '@mui/material/Grid';
import { mapMaterialToLikedMaterial } from 'utils/mappers';
import { LikedMaterial, MaterialCategory, MaterialLink } from 'entities/Material';
import React, { useEffect, useState } from 'react';
import useStyles from './MaterialsList.styles';
import { useSelector } from 'react-redux';
import { useMaterialActions } from 'store/materials';
import { materialsSelector } from 'store/materials/materials.selectors';
import MaterialItem from './materialItem';
import { Typography, Pagination } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';

interface MaterialsListProps {
  materials: MaterialLink[];
  pageCount: number;
  openLink: (material: LikedMaterial, key: number) => void;
}

const MaterialsList: React.FC<MaterialsListProps & WithTranslation> = ({
  materials,
  pageCount,
  openLink,
  t,
}) => {
  const { classes } = useStyles();
  const { page } = useSelector(materialsSelector);

  const { changePage } = useMaterialActions();

  const [categorizedMaterials, setCategorizedMaterials] = useState<MaterialCategory>();

  useEffect(() => {
    const result = materials.reduce((acc: MaterialCategory, material: MaterialLink) => {
      const type = material.isCustom ? 'custom' : 'notCustom';
      if (!acc[type]) acc[type] = [];
      if (material) acc[type]?.push(material);
      return acc;
    }, {});
    setCategorizedMaterials(result);
  }, [materials]);

  const renderMaterialGroup = (materials: MaterialLink[] | undefined, title: string) => {
    return (
      materials && (
        <>
          <Typography className={classes.title}>{title}:</Typography>
          {materials.map((material, index) => (
            <MaterialItem
              key={material.id}
              index={index}
              openLink={openLink}
              material={{
                ...mapMaterialToLikedMaterial(material),
              }}
            />
          ))}
        </>
      )
    );
  };

  return (
    <>
      <div className={classes.materialsContainer}>
        {renderMaterialGroup(categorizedMaterials?.custom, t('Study.Recommended for you'))}
        {renderMaterialGroup(categorizedMaterials?.notCustom, t('Study.More search results'))}
      </div>
      <Grid container alignItems={'flex-end'} justifyContent={'center'}>
        <Pagination
          size="small"
          count={pageCount}
          page={page}
          onChange={(_, value) => changePage(value)}
        />
      </Grid>
    </>
  );
};

export default withTranslation()(MaterialsList);
