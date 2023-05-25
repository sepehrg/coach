import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PlaceholderForEmptyProps {
  mainText: string;
  helpText?: string;
}

const PlaceholderForEmpty: React.FC<PlaceholderForEmptyProps> = ({ mainText, helpText }) => {
  return (
    <Box
      style={{
        width: '100%',
        padding: '15px 0',
        background: '#F2F5F7',
        borderRadius: 10,
      }}
    >
      <Typography style={{ paddingLeft: 21 }} variant={helpText ? 'body1' : 'h4'}>
        {mainText}
      </Typography>
      <Box style={{ paddingLeft: 21 }}>
        <Typography variant={'h4'}>{helpText}</Typography>
      </Box>
    </Box>
  );
};

export default PlaceholderForEmpty;
