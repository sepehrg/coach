import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { PropsWithChildren } from 'react';
import { Logo } from '../../../assets/images';
import useStyles from './AuthLayout.styles';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.header}>
        <img src={Logo} alt="Logo" className={classes.logoImg} />
      </Box>
      {children}
    </Container>
  );
};

export default AuthLayout;
