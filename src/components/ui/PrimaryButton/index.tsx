import React, { MutableRefObject, useRef } from 'react';
import styles from './styles.module.sass';
import { Button } from 'antd';

interface PrimaryButtonProps {
  children: any;
  action: (...args: any) => void;
  disable?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, action, disable }) => {
  const buttonRef: MutableRefObject<HTMLElement | null> = useRef(null);

  return (
    <Button
      ref={buttonRef}
      onClick={action}
      id={styles.primaryButton}
      disabled={disable}
      onKeyPress={(event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          action();
        }
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
