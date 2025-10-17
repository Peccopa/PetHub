import React from 'react';

export const Card = ({ title, value }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
};
