import React from 'react';
import Spin, { SpinProps } from 'antd/lib/spin';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './styles.module.sass';
import clsxFunc from 'clsx';

interface LoaderProps extends SpinProps {
  children?: any;
  className?: string;
  selfContained?: boolean;
  fluid?: boolean;
}

const Spinner: React.FC<LoaderProps> = ({
  children,
  selfContained = true,
  fluid,
  className,
  ...props
}) => {
  return (
    <Spin
      {...props}
      indicator={<LoadingOutlined spin style={!props.size ? { fontSize: 24 } : {}} />}
      className={clsxFunc(
        styles.spinner,
        {
          [styles.selfContained]: selfContained,
          [styles.fluid]: fluid,
        },
        className,
      )}
    >
      {children}
    </Spin>
  );
};

export default Spinner;
