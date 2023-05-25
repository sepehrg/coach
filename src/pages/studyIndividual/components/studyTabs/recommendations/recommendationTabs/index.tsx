import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, TabProps, Tabs } from '@mui/material';
import useStyles, { CustomTab } from './RecommendationTabs.styles';
import { All, Exercise, Summary, Video } from 'assets/images/icons';
import { MaterialLearningTypes } from 'entities/Material';

interface RecommendationTabsProps {
  tab: MaterialLearningTypes | null;
  onTabChange: (learningType: MaterialLearningTypes | null) => void;
}

interface Tab {
  label: string;
  icon: string;
  learningType: MaterialLearningTypes | null;
}

const RecommendationTabs: React.FC<RecommendationTabsProps & WithTranslation> = ({
  t,
  onTabChange,
  tab,
}) => {
  const { classes } = useStyles();

  const tabs: Tab[] = [
    { label: t('Study.Recommendation.All'), icon: All, learningType: null },
    {
      label: t('Study.Recommendation.Summary'),
      icon: Summary,
      learningType: MaterialLearningTypes.Article,
    },
    {
      label: t('Study.Recommendation.Exercise sheets'),
      icon: Exercise,
      learningType: MaterialLearningTypes.Exercise,
    },
    {
      label: t('Study.Recommendation.Video'),
      icon: Video,
      learningType: MaterialLearningTypes.Video,
    },
  ];

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    onTabChange(tabs[newValue].learningType);
  };

  function a11yProps(index: number): TabProps {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      className: classes.tab,
      label: tabs[index].label,
      icon: <img src={tabs[index].icon} alt="" />,
      wrapped: true,
    };
  }

  return (
    <Box className={classes.wrapper}>
      <Tabs
        variant="scrollable"
        classes={{
          indicator: classes.indicator,
        }}
        value={tabs.findIndex((t) => t.learningType === tab)}
        onChange={handleChange}
        className={classes.tabs}
      >
        <CustomTab {...a11yProps(0)} />
        <CustomTab {...a11yProps(1)} />
        <CustomTab {...a11yProps(2)} />
        <CustomTab {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default withTranslation()(RecommendationTabs);
