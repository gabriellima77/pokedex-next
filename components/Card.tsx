import Image from 'next/image';
import React from 'react';
import { getSVG } from './SVG/GetSVG';
import { contents } from '../data';
import styles from '../styles/Card.module.css';

interface cardProps {
  title: string;
  id: number;
  type: string;
  imageUrl: string;
}

const Card = ({ title, id, type, imageUrl }: cardProps) => {
  const typeContent = contents.find((content) => content.type === type);

  return (
    <div
      className={styles.cardContainer}
      style={{ background: typeContent?.linearBackground }}
    >
      <div className={styles.titleContainer}>
        <div className={styles.indexContainer}>
          {getSVG({ width: 50, opacity: 1, classList: '' })}
          <p className={styles.index}>#{id}</p>
        </div>
        {title}
      </div>
      <div
        className={styles.type}
        style={{
          background: typeContent?.defaultColor,
          boxShadow: `0px 0px 5px ${typeContent?.defaultColor}`,
        }}
      >
        {getSVG({ type, width: 20 })}
      </div>
      <Image src="/" width={150} alt={title} />
      {getSVG({ width: 150, classList: styles.pokeballBk })}
    </div>
  );
};

export default Card;
