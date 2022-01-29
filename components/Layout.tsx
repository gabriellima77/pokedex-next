import React, { useEffect, useState } from 'react';
import layoutStyles from '../styles/Layout.module.css';
import Meta from './Meta';
import Nav from './Nav';
import { pokemon } from '../pages/pokemonType';
import { getSVG } from './SVG/GetSVG';
import { contents } from '../data';

interface layoutProps {
  children: JSX.Element;
}

export const SearchContext = React.createContext('');

const Layout = ({ children }: layoutProps) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  // Nav layoutStyles and Pokemon page layoutStyles
  const pokemon: pokemon = children.props?.pokemon;
  const type = pokemon ? pokemon.types[0].type.name : '';
  const typeContent = contents.find((content) => content.type === type);
  const svgColor = typeContent ? typeContent.defaultColor : '#FFFFFF';
  const svgOpacity = type ? 1 : 0.75;

  const goUp = () => window.scrollTo(0, 0);
  const showUp = () => (window.scrollY < 100 ? setShow(false) : setShow(true));

  const pageType = children.type.name;

  // clean searchBar
  useEffect(() => {
    const pageType = children.type.name;
    if (pageType === 'Home') return;
    setValue('');
  }, [children.type.name]);

  useEffect(() => {
    window.addEventListener('scroll', showUp);
  }, []);

  return (
    <>
      <Meta />
      {pageType !== 'Custom404' ? (
        <Nav type={type} value={value} setValue={setValue} />
      ) : null}
      <div className={layoutStyles.container}>
        {getSVG({
          width: 600,
          color: svgColor,
          opacity: svgOpacity,
          classList: layoutStyles.pokeball,
        })}
        <SearchContext.Provider value={value}>
          {children}
        </SearchContext.Provider>
      </div>
      <button
        style={{ display: show ? 'block' : 'none' }}
        className={layoutStyles.upBtn}
        onClick={goUp}
      >
        <i className="fas fa-angle-double-up"></i>
      </button>
    </>
  );
};

export default Layout;
