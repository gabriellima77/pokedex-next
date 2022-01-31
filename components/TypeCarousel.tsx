import React, { useEffect, useState } from 'react';
import { contents } from '../data';
import { getSVG } from './SVG/GetSVG';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

interface typeProps {
  currentType?: string;
}

const TypeCarousel = ({ currentType }: typeProps) => {
  const [movement, setMovement] = useState(0);
  const marginRight = 0;
  const size = 50;
  const getTypes = () => {
    return contents.map((content, index) => {
      const color = content.defaultColor;
      const type = content.type;
      const active = currentType === type ? '#414141' : '';
      return (
        <Link key={type + index} href="/type/[type]" as={`/type/${type}`}>
          <a style={{ width: '100%', height: '100%' }}>
            <li
              style={{ margin: `0px ${marginRight}px`, background: active }}
              className={styles.slide}
            >
              {getSVG({ color, width: 30, type })}
            </li>
          </a>
        </Link>
      );
    });
  };

  // move Carousel based on currentType
  useEffect(() => {
    let index = contents.findIndex((content) => content.type === currentType);
    let lastType = 9;
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 615) lastType = 5;
    }
    if (index < 0) index = 0;
    else if (index >= contents.length - lastType)
      index = contents.length - lastType;
    const position = index * (size + marginRight * 2);
    if (movement === position) return;
    setMovement(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  const moveRight = () => {
    const position = Math.abs(movement);
    const index = position / (size + marginRight * 2);
    let lastType = 9;
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 615) lastType = 5;
    }
    if (index >= contents.length - lastType) return;
    setMovement((prev) => prev + size + marginRight * 2);
  };

  const moveLeft = () => {
    const position = Math.abs(movement);
    const index = position / (size + marginRight * 2);
    if (index <= 0) return;
    setMovement((prev) => prev - (size + marginRight * 2));
  };

  return (
    <div className={styles.carousel}>
      <button onClick={moveLeft} className={styles.carouselBtn}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className={styles.carouselWrapper}>
        <ul style={{ transform: `translateX(${-movement}px)` }}>
          {getTypes()}
        </ul>
      </div>
      <button onClick={moveRight} className={styles.carouselBtn}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default TypeCarousel;
