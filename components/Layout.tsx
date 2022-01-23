import React from 'react';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import { default as pokeball } from '../public/pokeball.svg';
import Meta from './Meta';
import Nav from './Nav';
import PokeBallSVG from './PokeBallSVG';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <PokeBallSVG width={600} />
        {children}
      </div>
    </>
  );
};

export default Layout;
