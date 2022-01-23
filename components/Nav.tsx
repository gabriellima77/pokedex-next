import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  return <nav className={styles.nav}>
    <ul>
      <li>
        <Link href="/bookmarks" passHref>
          <i className="fas fa-heart"></i> Favoritos
        </Link>
        Favoritos
      </li>
    </ul>
  </nav>;
};

export default Nav;
