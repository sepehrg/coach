import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import Loader from 'components/containers/Loader';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
import { userRoleSelector } from 'store/auth/auth.selectors';
import i18n from 'translations/i18n';
import Snackbar from './components/ui/Snackbar';
import useAuthActions from './store/auth';
import mainTheme from './styles/theme/MainTheme';
import createCache from '@emotion/cache';
import { TssCacheProvider } from 'tss-react';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  const actions = useAuthActions();
  const userRole = useSelector(userRoleSelector);
  const [inited, setInited] = useState<boolean>(false);

  const handleSetInited = useCallback(
    (value: boolean) => {
      setInited(value);
    },
    [setInited],
  );

  useEffect(() => {
    actions.authInit(handleSetInited);
  }, [actions, handleSetInited]);

  useEffect(() => {
    const language = localStorage.getItem('lng');
    if (language) i18n.changeLanguage(language);
  }, []);

  const muiCache = createCache({
    key: 'mui',
    prepend: true,
  });

  const tssCache = createCache({
    key: 'tss',
  });

  return (
    <>
      <ConfigProvider>
        <ThemeProvider theme={mainTheme}>
          <CacheProvider value={muiCache}>
            <TssCacheProvider value={tssCache}>
              <Snackbar />
              <Loader loading={!inited}>
                <Router>
                  <Routes userRole={userRole} />
                </Router>
              </Loader>
            </TssCacheProvider>
          </CacheProvider>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
