import Link from 'next/link';
import React from 'react';
import { contents } from '../data';
import styles from '../styles/Nav.module.css';

interface navProps {
  type: string;
  value: string;
  setValue: (a: string) => void;
}

const Nav = ({ type, value, setValue }: navProps) => {
  const typeContent = contents.find((content) => content.type === type);
  const linearGradient = typeContent ? typeContent.linearBackground : '';
  const defaultColor = typeContent ? typeContent.defaultColor : '';
  const searchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    setValue(str);
  };

  const getSearchBar = () => {
    return (
      <div className={styles.searchContainer}>
        <input
          id="search"
          className={styles.search}
          type="text"
          placeholder="Search"
          onChange={searchEvent}
          value={value}
        />
        <label htmlFor="search">
          <i className="fas fa-search" />
        </label>
      </div>
    );
  };

  const classList = !type ? styles.nav : styles.nav + ` ${styles.reverse}`;
  return (
    <nav
      className={classList}
      style={{
        background: linearGradient,
        boxShadow: `4px 0 4px 4px ${
          defaultColor ? defaultColor + 'AF' : 'rgba(0, 0, 0, 0.25)'
        }`,
      }}
    >
      <div className={styles.above}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>PokeDex</h1>
          </a>
        </Link>
      </div>
      {!type ? (
        getSearchBar()
      ) : (
        <Link href="/">
          <a className={styles.goBack}>
            <i className="fas fa-arrow-left"></i>
          </a>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
