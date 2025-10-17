import React from 'react';

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} PetHub. Все права защищены.</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#f1f1f1',
    padding: '1rem',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
  },
};
