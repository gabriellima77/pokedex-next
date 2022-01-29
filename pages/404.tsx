import Image from 'next/image';
import React from 'react';
import styles from '../styles/404.module.css';

const Custom404 = () => {
  return (
    <section className={styles.container404}>
      <figure className={styles.abra}>
        <Image src="/abra.png" layout="fill" alt="abra" />
      </figure>
      <h2>
        404 - Page Not Found!
        <br />
        Maybe you{"'"}re lost!
      </h2>
    </section>
  );
};

export default Custom404;
