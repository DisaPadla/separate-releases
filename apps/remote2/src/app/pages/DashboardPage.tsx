import styles from './DashboardPage.module.css';

const stats = [
  { label: 'Total Users', value: '24,812', trend: '+12%', emoji: '👥' },
  { label: 'Revenue', value: '$98,340', trend: '+8.4%', emoji: '💰' },
  { label: 'Active Sessions', value: '1,429', trend: '+3.1%', emoji: '📡' },
  { label: 'Conversion Rate', value: '3.6%', trend: '-0.5%', emoji: '📈' },
];

const recentActivity = [
  { user: 'Alice M.', action: 'Signed up', time: '2 min ago' },
  { user: 'Bob K.', action: 'Made a purchase', time: '5 min ago' },
  { user: 'Carol T.', action: 'Viewed dashboard', time: '8 min ago' },
  { user: 'Dave R.', action: 'Exported report', time: '15 min ago' },
  { user: 'Eve S.', action: 'Updated settings', time: '22 min ago' },
];

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📊 Analytics Dashboard</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statEmoji}>{stat.emoji}</span>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <strong className={styles.statValue}>{stat.value}</strong>
              <span
                className={`${styles.statTrend} ${
                  stat.trend.startsWith('-') ? styles.negative : styles.positive
                }`}
              >
                {stat.trend} this month
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.activity}>
        <h2>Recent Activity</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item, i) => (
              <tr key={i}>
                <td>{item.user}</td>
                <td>{item.action}</td>
                <td className={styles.time}>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
