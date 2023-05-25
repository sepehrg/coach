import React, { useState } from 'react';
import useStyles from './StudySpeedDial.styles';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Box } from '@mui/material';
import { CardsDial, NotebookDial } from 'assets/images';

interface StudySpeedDialProps {
  activateCreateCard: () => void;
  toggleShowStudyNotes: () => void;
}

const StudySpeedDial: React.FC<StudySpeedDialProps> = ({
  activateCreateCard,
  toggleShowStudyNotes,
}) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const actions = [
    {
      icon: <img src={NotebookDial} alt="" />,
      name: 'Notebook',
      onClick: toggleShowStudyNotes,
    },
    {
      icon: <img src={CardsDial} alt="" />,
      name: 'Study Cards',
      onClick: activateCreateCard,
    },
  ];

  return (
    <Box className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
        FabProps={{
          className: classes.speedDial,
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={classes.speedDialAction}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default StudySpeedDial;
