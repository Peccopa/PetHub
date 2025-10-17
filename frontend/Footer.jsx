import React from 'react';

export const Footer = () => (
  <footer style={styles.footer}>
    © 2025 PetHub. All rights reserved. | <a href="#">Docs</a> |{' '}
    <a href="#">Support</a>
  </footer>
);

const styles = {
  footer: {
    height: '50px',
    backgroundColor: '#fff',
    textAlign: 'center',
    lineHeight: '50px',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
  },
};
