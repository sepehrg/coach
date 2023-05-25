import React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LikedMaterial, MaterialLearningTypes } from 'entities/Material';
import useStyles from 'pages/study/components/MaterialsList/MaterialItem/MaterialItem.styles';
import * as Assets from 'pages/study/assets';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { MaterialUtils } from 'utils/materialsUtil';
import LikePanel from './LikePanel';

const chooseMaterialIcon = (materialLearningType: MaterialLearningTypes) => {
  switch (materialLearningType) {
    case MaterialLearningTypes.Interactive:
      return Assets.Interactive;
    case MaterialLearningTypes.Exercise:
      return Assets.Exercise;
    case MaterialLearningTypes.Video:
      return Assets.Video;
    default:
      return Assets.QuestionMarkLearningType;
  }
};

interface MaterialItemProps {
  material: LikedMaterial;
  likeAction: (isLiked: boolean, materialId: string) => void;
  openLink: (material: LikedMaterial, key: number) => void;
  index: number;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material, openLink, index, likeAction }) => {
  const { classes } = useStyles();

  const handleOpenLink = () => {
    if (MaterialUtils.isYoutubeLink(material)) {
      material.link = MaterialUtils.getEmbedLink(material);
    }
    openLink(material, index);
  };

  const handleLike = (isLiked: boolean) => {
    likeAction(isLiked, material.id);
  };

  const formattedTags = '' + material?.tags?.join(' ');

  return (
    <Grid
      item
      container
      lg={12}
      md={12}
      justifyContent={'space-between'}
      wrap={'nowrap'}
      className={classes.materialBox}
      onClick={
        material.iframe !== false
          ? handleOpenLink
          : () => {
              return;
            }
      }
    >
      {material.iframe !== false ? (
        <Box className={classes.typeIconContainer}>
          <div className={classes.iconWrapper}>
            <img
              src={chooseMaterialIcon(material.learningType)}
              alt="Learning type"
              className={classes.typeIcon}
            />
          </div>
          <Grid direction={'column'} className={classes.linkText}>
            <Typography variant={'h4'}>{material.name}</Typography>
            <Typography variant={'body1'}>{formattedTags}</Typography>
          </Grid>
        </Box>
      ) : (
        <a
          href={material.link}
          target={'_blank'}
          rel="noopener noreferrer"
          style={{ width: '80%', textDecoration: 'none' }}
        >
          <Box className={classes.typeIconContainer}>
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
            <Grid direction={'column'} className={classes.linkText}>
              <Typography variant={'h4'}>{material.name}</Typography>
              <Typography variant={'body1'}>{formattedTags}</Typography>
            </Grid>
          </Box>
        </a>
      )}
      <Grid
        container
        className={classes.flexRow}
        direction={'row'}
        justifyContent={'space-between'}
        wrap={'nowrap'}
      >
        <div className={classes.sourceText}>
          <Typography variant={'body1'}>{material.sourceType}</Typography>
        </div>
        <LikePanel isLiked={material.isLiked} action={handleLike} />
      </Grid>
    </Grid>
  );
};

export default MaterialItem;
