import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, Grid, TabProps, Tabs } from '@mui/material';
import useStyles, { CustomTab } from './StudyTabs.styles';
import LofiVideos from './lofiVideos';
import Recommendations from './recommendations';
import LearningHistory from './learningHistory';
import StudyCards from './studyCards';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface StudyTabsProps {
  tab: number;
  onTabChange: (tab: number) => void;
  createCardActive: boolean;
  setCreateCardActive: (state: boolean) => void;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={3}>{children}</Box>}
    </div>
  );
}

const StudyTabs: React.FC<StudyTabsProps & WithTranslation> = ({
  t,
  onTabChange,
  tab,
  createCardActive,
  setCreateCardActive,
}) => {
  const { classes } = useStyles();

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    onTabChange(newValue);
  };

  function a11yProps(index: any): TabProps {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      className: classes.tab,
      label: tabLabels[index],
      wrapped: true,
    };
  }

  const tabLabels = [
    t('Study.LoFi'),
    t('Study.Recommendations'),
    t('Study.Learning History'),
    t('Study.Study Cards'),
  ];

  return (
    <Grid container style={{ flexWrap: 'nowrap' }}>
      <Grid item className={classes.tabPanels}>
        <TabPanel value={tab} index={0}>
          <LofiVideos />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Recommendations />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <LearningHistory />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <StudyCards
            createCardActive={createCardActive}
            setCreateCardActive={setCreateCardActive}
          />
        </TabPanel>
      </Grid>
      <Grid item style={{ width: 380 }}>
        <Grid container className={classes.sidebar}>
          <Grid item>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              classes={{
                indicator: classes.indicator,
              }}
              value={tab}
              onChange={handleChange}
              className={classes.tabs}
            >
              <CustomTab {...a11yProps(0)} />
              <CustomTab {...a11yProps(1)} />
              <CustomTab {...a11yProps(2)} />
              <CustomTab {...a11yProps(3)} />
            </Tabs>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(StudyTabs);
