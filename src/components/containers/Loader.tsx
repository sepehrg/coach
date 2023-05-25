import React from 'react';
import Spinner from '../ui/Spinner';

interface LoaderProps {
  loading: boolean;
  children: any;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
  return loading ? <Spinner /> : children;
};

export default Loader;
