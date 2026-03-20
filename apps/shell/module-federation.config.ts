import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['remote1', 'remote2'],
  shared: (name, config) => {
    if (name === 'lodash-es') {
      return { ...config, singleton: false, requiredVersion: '4.17.21' };
    }
    return config;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
