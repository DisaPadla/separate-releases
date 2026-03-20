import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack.js';
import { ModuleFederationConfig } from '@nx/module-federation';

import baseConfig from './module-federation.config';

const isProd = process.env['NODE_ENV'] === 'production';

const config: ModuleFederationConfig = {
  ...baseConfig,
  // In production, remotes are registered dynamically at runtime via registerRemotes().
  // Static remotes are only needed for local dev server.
  remotes: isProd ? [] : baseConfig.remotes,
};

// Nx plugins for webpack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config, { dts: false })
);
