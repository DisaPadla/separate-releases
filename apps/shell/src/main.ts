import { registerRemotes } from '@module-federation/enhanced/runtime';

interface VersionsManifest {
  latest: Record<string, string>;
  available: Record<string, string[]>;
}

const STORAGE_KEY = 'mf-remote-versions';

function getSavedVersions(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function getSiteRoot(): string {
  // Primary: injected at deploy time on GitHub Pages
  const injected = (window as any).__SITE_ROOT__ as string | undefined;
  if (injected) {
    return window.location.origin + injected;
  }
  // Fallback: detect versioned shell path (/<repo>/shell/<version>/)
  const path = window.location.pathname;
  const shellIndex = path.indexOf('/shell/');
  if (shellIndex !== -1) {
    return window.location.origin + path.substring(0, shellIndex + 1);
  }
  // Fallback: use origin (works for local dev)
  return window.location.origin + '/';
}

async function loadManifest(): Promise<VersionsManifest | null> {
  try {
    const root = getSiteRoot();
    const res = await fetch(`${root}versions.json`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function resolveRemoteUrl(app: string, version: string): string {
  const root = getSiteRoot();
  return `${root}${app}/${version}/remoteEntry.js`;
}

async function bootstrap() {
  const manifest = await loadManifest();

  if (manifest) {
    const saved = getSavedVersions();
    const remote1Version = saved['remote1'] || manifest.latest.remote1;
    const remote2Version = saved['remote2'] || manifest.latest.remote2;

    // Store the manifest globally so the UI can read it
    (window as any).__MF_VERSIONS__ = {
      manifest,
      current: { remote1: remote1Version, remote2: remote2Version },
    };

    registerRemotes([
      { name: 'remote1', entry: resolveRemoteUrl('remote1', remote1Version) },
      { name: 'remote2', entry: resolveRemoteUrl('remote2', remote2Version) },
    ]);
  } else {
    // Fallback to local manifest for development
    const res = await fetch('/assets/module-federation.manifest.json');
    const remotes: Record<string, string> = await res.json();
    registerRemotes(
      Object.entries(remotes).map(([name, entry]) => ({ name, entry }))
    );
    (window as any).__MF_VERSIONS__ = null;
  }

  await import('./bootstrap').catch((err) => console.error(err));
}

bootstrap();
