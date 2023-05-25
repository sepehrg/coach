import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LikedMaterial, MaterialLearningTypes } from 'entities/Material';
import useStyles from './MaterialItem.styles';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { MaterialUtils } from 'utils/materialsUtil';
import { Summary, Exercise, Video, QuestionMarkLearningType } from 'assets/images/icons';

const chooseMaterialIcon = (materialLearningType: MaterialLearningTypes) => {
  switch (materialLearningType) {
    case MaterialLearningTypes.Article:
      return Summary;
    case MaterialLearningTypes.Exercise:
      return Exercise;
    case MaterialLearningTypes.Video:
      return Video;
    default:
      return QuestionMarkLearningType;
  }
};

interface MaterialItemProps {
  material: LikedMaterial;
  openLink: (material: LikedMaterial, key: number) => void;
  index: number;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material, index, openLink }) => {
  const { classes, cx } = useStyles();

  const handleOpenLink = () => {
    if (MaterialUtils.isYoutubeLink(material)) {
      material.link = MaterialUtils.getEmbedLink(material);
    }
    openLink(material, index);
  };

  const formattedTags =
    '' +
    (material.tags.length > 5
      ? material?.tags?.slice(0, 5).join(' ') + ' ...'
      : material?.tags?.join(' '));

  return (
    <Grid
      container
      wrap={'nowrap'}
      className={cx(classes.materialBox, material.isCustom && classes.customMaterialBox)}
      onClick={
        material.iframe !== false
          ? handleOpenLink
          : () => {
              return;
            }
      }
    >
      {material.iframe !== false ? (
        <Grid item>
          <Grid container className={classes.typeIconContainer}>
            <div className={classes.iconWrapper}>
              <img
                src={chooseMaterialIcon(material.learningType)}
                alt="Learning type"
                className={classes.typeIcon}
              />
            </div>
            <Grid container direction={'column'} className={classes.linkText}>
              <Typography className={cx(classes.name, material.isCustom && classes.customName)}>
                {material.name}
              </Typography>
              <Typography className={cx(classes.tags, material.isCustom && classes.customTags)}>
                {formattedTags}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <a href={material.link} target={'_blank'} rel="noopener noreferrer">
          <Grid item>
            <Grid container className={classes.typeIconContainer}>
              {material.learningType === MaterialLearningTypes.Other ? (
                <ContactSupportOutlinedIcon className={classes.typeIcon} />
              ) : (
                <div className={classes.iconWrapper}>
                  <img
                    src={chooseMaterialIcon(material.learningType)}
                    alt="Learning type"
                    className={classes.typeIcon}
                  />
                </div>
              )}
              <Grid item>
                <Grid container direction={'column'} className={classes.linkText}>
                  <Typography variant={'h4'}>{material.name}</Typography>
                  <Typography variant={'body1'}>{formattedTags}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </a>
      )}
      <Grid item className={classes.flexRow}>
        <div className={classes.sourceText}>
          <Typography variant={'body1'}>{material.sourceType}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default MaterialItem;
