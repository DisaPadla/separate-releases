import { useState, useEffect } from 'react';
import styles from './VersionSelector.module.css';

const STORAGE_KEY = 'mf-remote-versions';
const REMOTES = ['remote1', 'remote2'] as const;

interface VersionsData {
  manifest: {
    latest: Record<string, string>;
    available: Record<string, string[]>;
  };
  current: Record<string, string>;
}

function getSavedVersions(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveVersions(versions: Record<string, string>) {
  const cleaned = Object.fromEntries(
    Object.entries(versions).filter(([, v]) => v.trim() !== '')
  );
  if (Object.keys(cleaned).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  }
}

export function VersionSelector() {
  const versionsData = (window as any).__MF_VERSIONS__ as VersionsData | null;
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});

  useEffect(() => {
    const s = getSavedVersions();
    setSaved(s);
    setInputs(s);
  }, []);

  if (!versionsData) return null;

  const { manifest, current } = versionsData;

  const handleChange = (remote: string, value: string) => {
    setInputs((prev) => ({ ...prev, [remote]: value }));
  };

  const handleBlur = (remote: string) => {
    const value = inputs[remote]?.trim() || '';
    const newSaved = { ...saved };
    if (value === '' || value === manifest.latest[remote]) {
      delete newSaved[remote];
    } else {
      newSaved[remote] = value;
    }
    saveVersions(newSaved);
    setSaved(newSaved);

    if (JSON.stringify(newSaved) !== JSON.stringify(getSavedVersions())) {
      return;
    }
    // Check if version actually changed from what's currently loaded
    const oldVersion = current[remote];
    const newVersion = newSaved[remote] || manifest.latest[remote];
    if (oldVersion !== newVersion) {
      window.location.reload();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, remote: string) => {
    if (e.key === 'Enter') {
      handleBlur(remote);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved({});
    setInputs({});
    const needsReload = REMOTES.some(
      (r) => current[r] !== manifest.latest[r]
    );
    if (needsReload) {
      window.location.reload();
    }
  };

  return (
    <div className={styles.versionPanel}>
      <div className={styles.versionHeader}>
        <span className={styles.versionTitle}>🔧 Remote Versions</span>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset to latest
        </button>
      </div>
      {REMOTES.map((remote) => (
        <div key={remote} className={styles.remoteRow}>
          <span className={styles.remoteLabel}>{remote}</span>
          <input
            className={`${styles.versionInput} ${saved[remote] ? styles.overrideActive : ''}`}
            type="text"
            value={inputs[remote] || ''}
            onChange={(e) => handleChange(remote, e.target.value)}
            onBlur={() => handleBlur(remote)}
            onKeyDown={(e) => handleKeyDown(e, remote)}
            placeholder={`latest: ${manifest.latest[remote]}`}
          />
          <span className={styles.latestBadge}>
            using: {current[remote]}
          </span>
        </div>
      ))}
      <p className={styles.note}>
        Enter a version to pin a remote app. Leave empty for latest. Press Enter or click away to apply.
      </p>
    </div>
  );
}

export default VersionSelector;
