import Image from 'next/image';
import React, { useState } from 'react';
import { getSVG } from './SVG/GetSVG';
import { contents } from '../data';
import cardStyle from '../styles/Home.module.css';

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

  const moveCard = (event: React.MouseEvent | React.TouchEvent) => {
    const mostX = 12.5;
    const mostY = 12.5;
    let x;
    let y;
    if (event.nativeEvent instanceof MouseEvent) {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      x = event.nativeEvent.targetTouches[0].clientX - rect.x;
      y = event.nativeEvent.targetTouches[0].clientY - rect.y;
    }

    const { width, height } = event.currentTarget.getBoundingClientRect();
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const rotationY = ((x - halfWidth) / halfWidth) * mostX;
    const rotationX = ((y - halfHeight) / halfHeight) * mostY;

    setRotation(`rotateY(${rotationY}deg) rotateX(${rotationX}deg)`);
  };

  const resetRotation = () => setRotation('');

  return (
    <div
      onTouchMove={moveCard}
      onTouchEnd={resetRotation}
      onMouseMove={moveCard}
      onMouseLeave={resetRotation}
    >
      <div
        className={cardStyle.cardContainer}
        style={{
          background: typeContent?.linearBackground,
          transform: rotation,
        }}
      >
        <div>
          <div className={cardStyle.titleContainer}>
            <div className={cardStyle.indexContainer}>
              {getSVG({
                type: 'pokeball',
                width: 50,
                opacity: 1,
                classList: '',
              })}
              <p className={cardStyle.index}>#{id}</p>
            </div>
            {capitalTitle}
          </div>
          <div
            className={cardStyle.type}
            style={{
              background: typeContent?.defaultColor,
              boxShadow: `0px 0px 5px ${typeContent?.defaultColor}`,
            }}
          >
            {getSVG({ type, width: 20 })}
          </div>
        </div>

        <figure className={cardStyle.image}>
          <Image src={imageUrl} layout="fill" alt={title} />
        </figure>
        <div className={cardStyle.pokeballBk}>
          {getSVG({ width: 150, color: typeContent?.defaultColor })}
        </div>
      </div>
    </div>
  );
};

export default Card;
