import Image from 'next/image';
import React, { useState } from 'react';
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
  const capitalTitle = title[0].toUpperCase() + title.substring(1);
  const [rotation, setRotation] = useState('');

  const moveCard = (event: React.MouseEvent) => {
    const mostX = 12.5;
    const mostY = 12.5;
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const { width, height } = event.currentTarget.getBoundingClientRect();
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const rotationY = ((x - halfWidth) / halfWidth) * mostX;
    const rotationX = ((y - halfHeight) / halfHeight) * mostY;

    setRotation(`rotateY(${rotationY}deg) rotateX(${rotationX}deg)`);
  };

  const resetRotation = () => setRotation('');

  return (
    <div onMouseMove={moveCard} onMouseLeave={resetRotation}>
      <div
        className={styles.cardContainer}
        style={{
          background: typeContent?.linearBackground,
          transform: rotation,
        }}
      >
        <div>
          <div className={styles.titleContainer}>
            <div className={styles.indexContainer}>
              {getSVG({
                type: 'pokeball',
                width: 50,
                opacity: 1,
                classList: '',
              })}
              <p className={styles.index}>#{id}</p>
            </div>
            {capitalTitle}
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
        </div>

        <figure className={styles.image}>
          <Image src={imageUrl} layout="fill" alt={title} />
        </figure>
        <div className={styles.pokeballBk}>
          {getSVG({ width: 150, color: typeContent?.defaultColor })}
        </div>
      </div>
    </div>
  );
};

export default Card;
