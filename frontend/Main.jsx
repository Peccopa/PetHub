import React from 'react';
import { Card } from './Card.jsx';

export const Main = () => {
  const stats = [
    { title: 'Active Users', value: 1200 },
    { title: 'Sales', value: 550 },
    { title: 'Revenue', value: '$12,300' },
    { title: 'Feedbacks', value: 85 },
  ];

  return (
    <main style={styles.main}>
      <section style={styles.cards}>
        {stats.map((stat) => (
          <Card key={stat.title} {...stat} />
        ))}
      </section>

      <section style={styles.tableSection}>
        <h2>Recent Activity</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Login</td>
              <td>2025-10-16</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>Upload Photo</td>
              <td>2025-10-15</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

const styles = {
  main: { padding: '20px', flex: 1, overflowY: 'auto' },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  tableSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px' },
  td: { padding: '10px' },
};
