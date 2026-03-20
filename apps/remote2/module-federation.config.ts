import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote2',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (name, config) => {
    if (name === 'lodash-es') {
      return { ...config, singleton: false, requiredVersion: '4.17.15' };
    }
    return config;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
