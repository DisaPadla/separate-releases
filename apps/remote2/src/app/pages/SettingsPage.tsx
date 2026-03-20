import styles from './SettingsPage.module.css';
import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>⚙️ Settings</h1>

      <section className={styles.section}>
        <h2>Preferences</h2>
        <div className={styles.settings}>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <strong>Email Notifications</strong>
              <span>Receive email alerts for important events</span>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <strong>Dark Mode</strong>
              <span>Switch to a dark colour scheme</span>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <strong>Auto-Refresh Dashboard</strong>
              <span>Automatically refresh data every 30 seconds</span>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Account</h2>
        <div className={styles.form}>
          <label>
            <span>Display Name</span>
            <input type="text" defaultValue="John Doe" className={styles.input} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" defaultValue="john.doe@example.com" className={styles.input} />
          </label>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </section>
    </div>
  );
}
