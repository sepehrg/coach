import React from 'react';
import { NavLink } from 'react-router-dom';
import useStyles from './HamburgerMenu.styles';
import {
  Calendar,
  StudyCards,
  Lamp,
  Logout,
  Setting,
  EduCoach,
  Notebook,
} from 'assets/images/icons';
import Avatar from '@mui/material/Avatar';
import { profileSelector } from 'store/auth/auth.selectors';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import useAuthActions from 'store/auth';
import links from '../../../../../framework/links';
import { Logo, LogoSmall, MenuLogo } from 'assets/images';
import { arrayBufferToBase64 } from 'utils/imageConvertor';

interface MenuItem {
  link: string;
  component: React.ReactElement;
}

interface HamburgerMenuProps {
  small?: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ small }) => {
  const { classes, cx } = useStyles();
  const actions = useAuthActions();
  const profile = useSelector(profileSelector);

  const menuItems: MenuItem[] = [
    {
      link: links.student.dashboard,
      component: <img src={EduCoach} alt="Dashboard" />,
    },
    {
      link: links.student.focusTime,
      component: <img src={Lamp} alt="Focus time" />,
    },
    {
      link: links.student.studyDiary,
      component: <img src={Calendar} alt="Calendar" />,
    },
    {
      link: links.student.studyCards,
      component: <img src={StudyCards} alt="Study cards" />,
    },
    {
      link: links.student.studyNotes,
      component: <img src={Notebook} alt="Notebook" />,
    },
  ];

  return (
    <div className={classes.navContainer}>
      <div className="bg"></div>
      <div className={cx(classes.button, 'button')} tabIndex={0}>
        <img
          src={small ? LogoSmall : Logo}
          alt="Logo"
          className={cx(small ? classes.logoImgSmall : classes.logoImg)}
        />
      </div>
      <div className={cx(classes.navContent, 'navContent')} tabIndex={0}>
        <Grid container className={classes.menu}>
          <Grid item className={classes.topItem}>
            <Grid container className={classes.top}>
              <Grid item>
                <Avatar
                  src={`data:image/jpg;base64,${arrayBufferToBase64(profile?.icon?.data || [])}`}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item container className={classes.pages}>
                {menuItems.map((item, index) => (
                  <Grid item key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        [classes.link, isActive ? classes.active : null].filter(Boolean).join(' ')
                      }
                    >
                      {item.component}
                      <div className={'activeMenuHighlight'}></div>
                    </NavLink>
                  </Grid>
                ))}
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <NavLink
                  to={links.student.profile}
                  className={({ isActive }) =>
                    [classes.setting, isActive ? classes.active : null].filter(Boolean).join(' ')
                  }
                >
                  <img src={Setting} alt="Setting" />
                </NavLink>
                <button className={classes.linkButton} onClick={actions.logout}>
                  <img src={Logout} alt="logout" width="36" height="36" />
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.logoMenu}>
            <img src={MenuLogo} alt="logo" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HamburgerMenu;
