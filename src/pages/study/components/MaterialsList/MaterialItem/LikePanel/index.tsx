import React, { useState } from 'react';
import IconButton from 'components/ui/IconButton';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import useStyles from 'pages/study/components/MaterialsList/MaterialItem/LikePanel/LikePanel.styles';

interface LikePanelProps {
  isLiked?: boolean;
  action: (isLiked: boolean) => void;
}

const LikePanel: React.FC<LikePanelProps> = ({ isLiked, action }) => {
  const { classes } = useStyles();

  const [liked, setLiked] = useState<boolean | undefined>(isLiked);

  const handleLike = (value: boolean) => {
    setLiked(value);
    action(value);
  };

  const renderDislike = () => (
    <Box className={classes.likeWrapper}>
      {liked === false ? (
        <ThumbDownIcon color={'primary'} />
      ) : (
        <IconButton action={() => handleLike(false)} size="large">
          <ThumbDownOutlinedIcon color={'primary'} />
        </IconButton>
      )}
    </Box>
  );

  const renderLike = () => (
    <Box className={classes.likeWrapper}>
      {liked ? (
        <ThumbUpIcon color={'primary'} />
      ) : (
        <IconButton action={() => handleLike(true)} size="large">
          <ThumbUpOutlinedIcon color={'primary'} />
        </IconButton>
      )}
    </Box>
  );

  return (
    <Box className={classes.root} onClick={(e) => e.stopPropagation()}>
      {renderLike()}
      {renderDislike()}
    </Box>
  );
};

export default LikePanel;
