import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'components/ui/index';
import { isLoadingSelector, isAuthorizedSelector } from 'store/auth/auth.selectors';
import MainLayout from 'components/layout/mainLayout';

export interface IPrivateRouteProps {
  [key: string]: unknown;
  path?: string;
  component?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.FC<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentClass<any, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.FunctionComponent<any>;
}

const PrivateRoute: React.FunctionComponent<PropsWithChildren> = ({
  children,
}): React.ReactElement<unknown> => {
  const isAuthorized: boolean = useSelector(isAuthorizedSelector);
  const isLoading: boolean = useSelector(isLoadingSelector);
  const location = useLocation();

  const renderComponent = () => {
    // TODO: Test if .state is correct
    console.log('location', location);
    if (location.state === '/login') {
      return null;
    }

    if (isLoading && !isAuthorized) {
      return <Loader fluid />;
    }

    if (!isLoading && !isAuthorized) {
      return <Navigate replace to="/login" state={{ from: location }} />;
    }

    return children;
  };

  return <MainLayout>{renderComponent()}</MainLayout>;
};

export default PrivateRoute;
