import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

interface PlaceholderBoxProps {
  text: string;
}

const PlaceholderBox: React.FC<PlaceholderBoxProps> = ({ text }) => (
  <Box
    style={{
      width: '80%',
      padding: '15px 21px',
      background: '#F2F5F7',
      borderRadius: 10,
    }}
  >
    <Typography variant={'h4'}>{text}</Typography>
  </Box>
);

export default PlaceholderBox;
