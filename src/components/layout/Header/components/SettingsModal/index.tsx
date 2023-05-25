import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import links from 'framework/links';
import { Link } from 'react-router-dom';
import useStyles from './SettingsModal.styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { withTranslation, WithTranslation } from 'react-i18next';

interface SettingsModalProps {
  lng: string;
  changeLng: (lng: string) => void;
  onLogoutClick: () => void;
}

const SettingsModal: React.FC<SettingsModalProps & WithTranslation> = ({
  lng,
  changeLng,
  onLogoutClick,
  t,
}) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Link to={links.student.profile} style={{ textDecoration: 'none', color: 'black' }}>
        <Box className={classes.settingsItem}>
          <SettingsIcon className={classes.settingsItemIcon} />
          <Typography variant={'body1'}>{t('Common.Profile settings')}</Typography>
        </Box>
      </Link>
      <Box
        className={`${classes.settingsItem} ${classes.settingsItemLng}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 30,
          }}
        >
          <LanguageIcon className={classes.settingsItemIcon} />
          <Typography variant={'body1'}>{t('Common.Language')}</Typography>
        </Box>
        <Box className={classes.languageBox}>
          <Box
            className={`${classes.languageItem} ${lng === 'de' && classes.languageItemActive}`}
            onClick={() => changeLng('de')}
          >
            DE
          </Box>
          <Box
            className={`${classes.languageItem} ${lng === 'en' && classes.languageItemActive}`}
            onClick={() => changeLng('en')}
          >
            EN
          </Box>
        </Box>
      </Box>
      <Box className={classes.delimBox} />
      <Box className={classes.settingsItem} style={{ marginBottom: 0 }} onClick={onLogoutClick}>
        <ExitToAppIcon className={classes.settingsItemIcon} />
        <Typography variant={'body1'}>{t('Common.Log out')}</Typography>
      </Box>
    </Box>
  );
};

export default withTranslation()(SettingsModal);
