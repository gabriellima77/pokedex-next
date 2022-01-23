import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  const [hasSearchBar, setHasSearchBar] = useState(true);

  const getSearchBar = () => {
    return (
      <div className={styles.searchContainer}>
        <input
          id="search"
          className={styles.search}
          type="text"
          placeholder="Search"
        />
        <label htmlFor="search">
          <i className="fas fa-search" />
        </label>
      </div>
    );
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.above}>
        <Link href="/" passHref>
          <a>
            <h1 className={styles.title}>PokeDex</h1>
          </a>
        </Link>

        <ul className={styles.list}>
          <li>
            <Link href="/bookmarks">
              <a>
                <i className="fas fa-heart" />
                Bookmarks
              </a>
            </Link>
          </li>
        </ul>
      </div>
      {getSearchBar()}
    </nav>
  );
};

export default Nav;
