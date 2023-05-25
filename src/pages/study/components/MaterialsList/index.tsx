import { Button, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import { mapMaterialToLikedMaterial } from 'utils/mappers';
import Loader from 'components/containers/Loader';
import { LikedMaterial, MaterialLink, RelatedTag } from 'entities/Material';
import MaterialItem from 'pages/study/components/MaterialsList/MaterialItem';
import React, { useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import useStyles from './MaterialsList.styles';
import _ from 'lodash-es';
import Illustrations from 'assets/images/llustrations/illustrations';
import { useSelector } from 'react-redux';
import { Search } from 'assets/images/icons';
import { useTopicActions } from 'store/topics';
import { useTagsActions } from 'store/tags';
import { useMaterialActions } from 'store/materials';
import {
  materialsLinksSelector,
  materialsPageCountSelector,
  materialsSelector,
  selectedMaterialSelector,
} from 'store/materials/materials.selectors';
import { placeholderTagsSelector } from 'store/tags/tags.selectors';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';

interface MaterialsListProps {
  materials: MaterialLink[];
  likeAction: (isLiked: boolean, materialId: string) => void;
  openLink: (material: LikedMaterial, key: number) => void;
  openLinkModal: () => void;
  isLoading: boolean;
  showSearchButton: boolean;
  relatedTags: RelatedTag[];
  onTagClick: (tag?: string) => void;
  chosenTag: string | null;
  subject?: string;
}

const MaterialsList: React.FC<MaterialsListProps & WithTranslation> = ({
  materials,
  subject,
  onTagClick,
  relatedTags,
  openLink,
  likeAction,
  isLoading,
  showSearchButton,
  chosenTag,
  t,
}) => {
  const { classes } = useStyles();
  const { page } = useSelector(materialsSelector);
  const pageCount = useSelector(materialsPageCountSelector);
  const materialsLinks = useSelector(materialsLinksSelector);
  const placeholderTags = useSelector(placeholderTagsSelector);
  const selectedMaterial = useSelector(selectedMaterialSelector);

  const { resetTags } = useTagsActions();
  const { reset: resetTopics, clearChosenTopic } = useTopicActions();
  const { resetMaterials, changePage } = useMaterialActions();

  const [activeTagButton, setActiveTagButton] = useState<string>('all');

  const emptyState = () => (
    <Grid
      item
      container
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
      className={classes.emptyStateWrapper}
    >
      <Typography className={classes.emptyStateTopText}>
        {t('Study.Materials.No study links', { subject: subject })}
      </Typography>
      <img src={Illustrations.EmptyState} alt="empty city" className={classes.emptyStateImage} />
      <Typography className={classes.emptyStateBottomText}>
        {t('Study.Materials.Propose new links')}
      </Typography>
      <Typography>
        {t('Study.Materials.Continue without links')}
        <span role="img" aria-label="rock emoji">
          🤘
        </span>
      </Typography>
    </Grid>
  );

  const rowRenderer = ({ index, style }: ListChildComponentProps) => {
    return (
      <div style={style}>
        <MaterialItem
          index={index}
          material={mapMaterialToLikedMaterial(materials[index])}
          likeAction={likeAction}
          openLink={openLink}
        />
      </div>
    );
  };

  const clearSavedData = () => {
    resetMaterials();
    resetTopics();
    clearChosenTopic();
    resetTags();
  };

  const materialsAll = () => (
    <div className={classes.materialsContainer}>
      <ReactVirtualizedAutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemCount={materials.length}
            height={height}
            itemSize={80}
            width={width}
            overscanCount={3}
            children={rowRenderer}
            initialScrollOffset={selectedMaterial?.index ? selectedMaterial.index * 80 : 0}
          />
        )}
      </ReactVirtualizedAutoSizer>
      <Grid
        container
        alignItems={'flex-end'}
        justifyContent={'center'}
        className={classes.pagination}
      >
        <Pagination
          size="small"
          count={pageCount}
          page={page}
          onChange={(_event, value) => changePage(value)}
        />
      </Grid>
    </div>
  );

  return (
    <Grid container direction={'column'} alignItems={'flex-start'}>
      <Grid item container direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        {materials.length ? (
          <Grid item direction={'row'}>
            <Typography variant={'h3'}>
              {t('Study.Materials.Found these links')}
              <span className={classes.topic}>{` "${chosenTag}"`}</span>
            </Typography>
          </Grid>
        ) : null}
        <Grid item>
          {showSearchButton && placeholderTags?.length ? (
            <Button
              variant={'contained'}
              color={'primary'}
              disableElevation={true}
              endIcon={<img src={Search} alt="search" />}
              onClick={clearSavedData}
            >
              {t('Study.Materials.Search new topic')}
            </Button>
          ) : null}
        </Grid>
        {!!relatedTags.length && (
          <Grid direction={'row'} className={classes.slider} wrap={'nowrap'}>
            <div className={classes.buttonsWrapper}>
              <Button
                variant={'contained'}
                disableElevation
                onClick={() => {
                  setActiveTagButton('all');
                  onTagClick('');
                }}
                disableRipple
                className={`${activeTagButton === 'all' && classes.tagBtnActive} ${classes.label} ${
                  classes.tagBtn
                }`}
              >
                {t('Study.Materials.All')} ({materialsLinks.length})
              </Button>
              {relatedTags?.map((tag) => {
                return (
                  <Button
                    key={tag.tag}
                    variant={'contained'}
                    onClick={() => {
                      setActiveTagButton(tag.tag);
                      onTagClick(tag.tag);
                    }}
                    disableElevation
                    className={`${activeTagButton === tag.tag && classes.tagBtnActive} ${
                      classes.tagBtn
                    } ${classes.label}`}
                  >
                    {tag.tag} ({tag.count})
                  </Button>
                );
              })}
            </div>
          </Grid>
        )}
      </Grid>
      <Loader loading={isLoading}>{_.isEmpty(materials) ? emptyState() : materialsAll()}</Loader>
    </Grid>
  );
};

export default withTranslation()(MaterialsList);
