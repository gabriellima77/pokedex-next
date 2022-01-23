import React from 'react';
import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import { getSVG } from './SVG/GetSVG';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        {getSVG({ width: 600 })}
        {children}
      </div>
    </>
  );
};

export default Layout;
