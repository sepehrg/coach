import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './MainSection.styles';
import { LearningSetOverview } from 'entities/StudyCardSet';
import LevelCard from '../LevelCard';
import { levels } from './levelsData';
import { useSnackbarActions } from 'store/snackbar';
import { withTranslation, WithTranslation } from 'react-i18next';
import ProgressBar from 'pages/dashboard/components/progressBar';

interface MainSectionProps {
  set: LearningSetOverview | null;
  onLevelSelected: (level: keyof LearningSetOverview) => void;
}

const MainSection: React.FC<MainSectionProps & WithTranslation> = (props) => {
  const { set, onLevelSelected, t } = props;
  const { classes, cx } = useStyles();
  const { show: showSnackbar } = useSnackbarActions();

  const onCardClick = (level: keyof LearningSetOverview) => {
    if (!set || set[level] < 1) {
      showSnackbar('error', t('Study Cards.Learn.No cards error'));
      return;
    }
    onLevelSelected(level);
  };

  const renderLevelCard = (
    level: keyof LearningSetOverview,
    levelData: { level: string; title: string; icon: string },
  ) => {
    return (
      <>
        <LevelCard
          cardsCount={set ? (set[level] as number) : 0}
          levelIcon={levelData.icon}
          levelTitle={levelData.title}
          onCardClick={() => onCardClick(level)}
        />
      </>
    );
  };

  const renderLevelCards = () => {
    if (!set) return;
    return (
      <Grid container direction="row" wrap={'nowrap'} className={classes.levelsWrapper}>
        {Object.keys(set).map((l: string) => {
          const level = l as keyof LearningSetOverview;
          const levelData = levels.find((element) => element.level === level);
          if (!levelData) return null;

          return (
            <Grid item key={level} className={cx(classes.card, level == 4 && classes.divider)}>
              {renderLevelCard(level, levelData)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid className={classes.container}>
      <ProgressBar percent={set?.progress ? set.progress : 0} />
      {renderLevelCards()}
    </Grid>
  );
};

export default withTranslation()(MainSection);
