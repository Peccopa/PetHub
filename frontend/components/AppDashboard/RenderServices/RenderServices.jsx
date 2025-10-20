import React, { useEffect, useState } from 'react';

const STATUS_COLORS = {
  live: '#22c55e',
  building: '#eab308',
  failed: '#ef4444',
  suspended: '#ef4444',
  unknown: '#94a3b8',
};

function timeAgo(updatedAt) {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMs = now - updated;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `Обновлено ${diffSec} сек. назад`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `Обновлено ${diffMin} мин. назад`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Обновлено ${diffHours} ч. назад`;
  const diffDays = Math.floor(diffHours / 24);
  return `Обновлено ${diffDays} дн. назад`;
}

const RenderServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/render-services');
      const data = await res.json();
      console.log('Render API data:', data);

      const servicesArray = Array.isArray(data)
        ? data.map((s) => s.service)
        : [];
      setServices(servicesArray);
    } catch (err) {
      console.error('Ошибка при получении сервисов Render:', err);
      setError('Не удалось загрузить сервисы Render');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <div>{error}</div>;
  if (services.length === 0) return <div>Нет доступных сервисов Render</div>;

  return (
    <div className="service-grid" style={{ display: 'grid', gap: '1rem' }}>
      {services.map((svc) => {
        const name = svc.name || 'Без имени';
        const updatedAt = svc.updatedAt || '#';
        const statusRaw =
          svc.suspended === 'not_suspended' ? 'live' : 'suspended';
        const status = statusRaw.toLowerCase();
        const color = STATUS_COLORS[status] || STATUS_COLORS.unknown;

        // Формируем ссылку на последний коммит
        const repo = svc.repo || 'https://github.com/Peccopa/PetHub';
        const branch = svc.branch || 'main';
        const commitsUrl = `${repo}/commits/${branch}`;

        return (
          <div
            key={svc.id}
            className="service-card"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '0.75rem',
              backgroundColor: '#f8fafc',
            }}
          >
            <div
              className="service-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <span className="service-name" style={{ fontWeight: 'bold' }}>
                {name}
              </span>
              <span
                className="service-status"
                style={{
                  backgroundColor: color,
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '0 0.5rem',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                }}
              >
                {status}
              </span>
            </div>

            <div className="service-body" style={{ marginBottom: '0.25rem' }}>
              <a
                href={commitsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', color: '#2563eb', textDecoration: 'none' }}
              >
                Последний коммит
              </a>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {timeAgo(updatedAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RenderServices;
