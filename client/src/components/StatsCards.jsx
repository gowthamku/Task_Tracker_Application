export default function StatsCards({ stats }) {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: '📊',
      gradient: 'var(--gradient-primary)',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: '⏳',
      gradient: 'var(--gradient-warm)',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: '🔄',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: '✅',
      gradient: 'var(--gradient-success)',
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className="stat-card glass"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon-wrapper" style={{ background: card.gradient }}>
            <span className="stat-icon">{card.icon}</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
