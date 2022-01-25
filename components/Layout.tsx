import React from 'react';
import styles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import { pokemon } from '../pages/pokemonType';
import { getSVG } from './SVG/GetSVG';
import { contents } from '../data';

interface layoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: layoutProps) => {
  const pokemon: pokemon = children.props?.pokemon;
  const type = pokemon ? pokemon.types[0].type.name : '';
  const typeContent = contents.find((content) => content.type === type);
  const svgColor = typeContent ? typeContent.defaultColor : '#FFFFFF';
  const svgOpacity = type ? 1 : 0.75;

  return (
    <>
      <Meta />
      <Nav type={type} />
      <div className={styles.container}>
        {getSVG({ width: 600, color: svgColor, opacity: svgOpacity })}
        {children}
      </div>
    </>
  );
};

export default Layout;
