import Link from 'next/link';
import React from 'react';
import { contents } from '../data';
import styles from '../styles/Nav.module.css';

interface navProps {
  type: string;
}

const Nav = ({ type }: navProps) => {
  const typeContent = contents.find((content) => content.type === type);
  const linearGradient = typeContent ? typeContent.linearBackground : '';
  const defaultColor = typeContent ? typeContent.defaultColor : '';

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
    <nav
      className={styles.nav}
      style={{
        background: linearGradient,
        boxShadow: `4px 0 4px 4px ${
          defaultColor ? defaultColor + 'AF' : 'rgba(0, 0, 0, 0.25)'
        }`,
      }}
    >
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
      {!type ? getSearchBar() : null}
    </nav>
  );
};

export default Nav;
