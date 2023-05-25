import clsxFunc from 'clsx';
import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import styles from './styles.module.sass';

interface LinkProps extends RouterLinkProps {
  className?: string;
}

const Link: React.FC<LinkProps> = ({ children, className, ...props }) => {
  return (
    <RouterLink {...props} className={clsxFunc(className ?? '', styles.Link)}>
      {children}
    </RouterLink>
  );
};

export default Link;
