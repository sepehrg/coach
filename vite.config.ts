import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import vitePluginImp from 'vite-plugin-imp';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const options: UserConfigExport = {
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'react-router': 'ReactRouter',
            'react-router-config': 'ReactRouterConfig',
            '@emotion/react': 'EmotionReact',
            '@emotion/styled': 'EmotionStyled',
          },
        },
      },
      commonjsOptions: {
        include: ['react'],
        transformMixedEsModules: true,
      },
    },
    plugins: [
      react({ jsxRuntime: 'classic' }),
      viteTsconfigPaths(),
      svgrPlugin(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      nodePolyfills(),
    ],
    server: {
      open: true,
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    optimizeDeps: {
      disabled: false,
      include: [
        'react',
        'react-dom',
        '@emotion/react',
        '@emotion/styled',
        'react-router-dom',
        'react-router',
      ],
    },
  };

  if (mode !== 'production') {
    options.build = {
      ...options.build,
      sourcemap: 'inline',
    };
  }
  return options;
});
