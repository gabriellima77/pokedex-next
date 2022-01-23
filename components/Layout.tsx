import React from 'react';
import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Layout;
