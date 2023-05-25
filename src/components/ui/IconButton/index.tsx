import React, { PropsWithChildren } from 'react';
import { Button } from '@mui/material';

interface IconButtonProps {
  action: (...args: any) => void;
  size?: 'small' | 'medium' | 'large';
  outerClass?: string;
}

const IconButton: React.FC<IconButtonProps & PropsWithChildren> = ({
  action,
  outerClass,
  size,
  children,
}) => {
  return (
    <Button
      onClick={action}
      style={{ padding: 0, minWidth: 0, cursor: 'pointer' }}
      size={size}
      className={outerClass || ''}
    >
      {children}
    </Button>
  );
};

export default IconButton;
