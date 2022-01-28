import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Meta from '../../../components/Meta';
import styles from '../../../styles/Pokemon.module.css';
import { getSVG } from '../../../components/SVG/GetSVG';
import { pokemon } from '../../pokemonType';
import { contents } from '../../../data';
import Evolution from '../../../components/Evolution';
import Moves from '../../../components/Moves';

interface pokemonProps {
  pokemon: pokemon;
  setType: (a: string) => void;
}

const Pokemon = ({ pokemon }: pokemonProps) => {
  const title = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
  const type = pokemon.types[0].type.name;
  const captalizedType = type[0].toUpperCase() + type.substring(1);
  const content = contents.find((content) => content.type === type);

  const getStatus = () => {
    console.log(window.innerWidth);
    const marginRight = window.innerWidth > 420 ? '305px' : '205px';
    const maxStatus = 200;
    let total = 0;
    const status = pokemon.stats.map((content, index) => {
      const base = content.base_stat;
      total += base;
      const percentage = base * (100 / maxStatus);
      let { name } = content.stat;
      name = name.toUpperCase();
      if (name.includes('SPECIAL')) name = name.replace('SPECIAL-', 'SP.');

      return (
        <div key={index} className={styles.status}>
          <p>{name}</p>
          <div className={styles.stat}>
            <div style={{ width: `${percentage}%` }}>
              <span>{base}</span>
            </div>
          </div>
        </div>
      );
    });
    status.push(
      <div key="total" className={styles.status}>
        <p style={{ marginRight }}>Total: {total}</p>
      </div>
    );
    return status;
  };

  const getHeight = () => {
    const height = Math.floor(pokemon.height * 100) / 1000;
    return (
      <div className={styles.heightContainer}>
        {height}m<div className={styles.height}></div>
      </div>
    );
  };

  return (
    <>
      <Meta title={title} />
      <section className={styles.sectionContainer}>
        <h2
          style={{
            textShadow: `0px 4px 10px ${content?.defaultColor}`,
          }}
          className={styles.pokemonName}
        >
          {title}
        </h2>
        <div className={styles.type}>
          <div
            className={styles.bkType}
            style={{ background: content?.defaultColor }}
          ></div>
          {captalizedType}
          <span style={{ marginLeft: 5 }}>{getSVG({ width: 24, type })}</span>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.pokemonBox}>
            {getHeight()}
            <figure className={styles.pokeImage}>
              <Image
                src={pokemon.sprites.front_default}
                layout="fill"
                alt={title}
              />
            </figure>
          </div>
          <div>{getStatus()}</div>
        </div>
      </section>
      <Evolution id={pokemon.id} />
      <Moves moves={pokemon.moves} type={type} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.params?.id}`
  );
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};

export default Pokemon;
