import React from 'react';
import useWorker from '../../narrative-design/useWorker';

function withIdo(WrappedComponent) {
  return function WithIdoComponent(props) {
    const { portalComponent, showIdo, ...portalProps } = useWorker();
    const { ...rest } = props;

    return (
      <>
        {portalComponent}
        <WrappedComponent {...rest} showIdo={showIdo} {...portalProps} />
      </>
    );
  };
}

export default withIdo;
