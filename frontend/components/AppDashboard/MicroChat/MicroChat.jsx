import React, { useEffect, useState } from 'react';

const MicrochatStatus = () => {
  const [status, setStatus] = useState(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const json = await res.json();
      setStatus(json);
    } catch (err) {
      setStatus({ status: 'down', error: err.message });
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // обновление каждые 10 сек
    return () => clearInterval(interval);
  }, []);

  if (!status) return <div>Загрузка...</div>;

  return (
    <div className="card">
      <h4>Microchat</h4>
      <p>
        Статус:{' '}
        <span style={{ color: status.status === 'ok' ? 'green' : 'red' }}>
          {status.status}
        </span>
      </p>
      {status.messagesCount !== undefined && (
        <p>Сообщений в базе: {status.messagesCount}</p>
      )}
      {status.error && <p style={{ color: 'red' }}>Ошибка: {status.error}</p>}
    </div>
  );
};

export default MicrochatStatus;
