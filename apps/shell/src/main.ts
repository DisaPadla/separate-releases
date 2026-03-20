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

async function loadManifest(): Promise<VersionsManifest | null> {
  try {
    const base = (document.querySelector('base')?.href || window.location.origin).replace(/\/$/, '');
    const res = await fetch(`${base}/versions.json`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function resolveRemoteUrl(app: string, version: string): string {
  const base = (document.querySelector('base')?.href || window.location.origin).replace(/\/$/, '');
  return `${base}/${app}/${version}/remoteEntry.js`;
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
