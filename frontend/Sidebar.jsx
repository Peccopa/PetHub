import React from 'react';

export const Sidebar = () => {
  const links = [
    'Dashboard',
    'Users',
    'Analytics',
    'Settings',
    'Messages',
    'Reports',
  ];
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>Admin Panel</h2>
      <ul style={styles.ul}>
        {links.map((link) => (
          <li key={link} style={styles.li}>
            {link}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#1F2937',
    color: '#fff',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: { marginBottom: '30px' },
  ul: { listStyle: 'none', padding: 0 },
  li: {
    margin: '15px 0',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: '0.2s',
  },
};
