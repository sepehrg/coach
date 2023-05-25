import React from 'react';
import { Button, Grid } from '@mui/material';
import { CopyWhite, SelectAll } from 'assets/images/icons';
import useStyles from './CopySidebar.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface CopySidebarProps {
  onSelectAll: () => void;
  onSave: () => void;
}

const CopySidebar: React.FC<CopySidebarProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { onSelectAll, onSave, t } = props;

  return (
    <Grid className={classes.sidebar} container alignItems={'center'} justifyContent={'center'}>
      <Button
        disableElevation
        classes={{
          root: `${classes.menuButton} ${classes.blueButton}`,
          text: `${classes.menuLabel} ${classes.blueButtonLabel}`,
        }}
        onClick={onSave}
        variant="contained"
      >
        <img src={CopyWhite} alt={''} className={classes.copyImg} />
        {t('Study Cards.Discover.Copy')}
      </Button>
      <Button
        disableElevation
        variant="contained"
        onClick={onSelectAll}
        classes={{ root: classes.menuButton, text: classes.menuLabel }}
      >
        <img src={SelectAll} alt={''} />
        {t('Study Cards.Discover.Select All')}
      </Button>
    </Grid>
  );
};

export default withTranslation()(CopySidebar);
