import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Pokemons } from '../pages/pokemonType';
import styles from '../styles/Evolution.module.css';
import { contents } from '../data';

type evolutionProps = {
  id: number;
};

interface evolution {
  chain: {
    species: { name: string };
    evolves_to: [
      {
        species: { name: string };
        evolves_to: [
          {
            species: { name: string };
          }
        ];
      }
    ];
    evolution_detail: [
      {
        trigger: { name: string };
        min_level: number;
      }
    ];
  };
}

const Evolution = ({ id }: evolutionProps) => {
  const [evolution, setEvolution] = useState<Pokemons>();

  const fetchEvolution = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const pokemon = await res.json();
    const evolutionURL = pokemon.evolution_chain.url;
    const evolutionRes = await fetch(evolutionURL);
    const evolution: evolution = await evolutionRes.json();
    getEvolutionChain(evolution);
  };

  const getEvolutionChain = async (evolution: evolution) => {
    const firstName = evolution.chain.species.name;
    const secondName = evolution.chain.evolves_to[0].species.name;
    const thirdName = evolution.chain.evolves_to[0].evolves_to[0].species.name;
    const array = [firstName, secondName, thirdName];
    const promises = array.map((name) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((resp) =>
        resp.json()
      )
    );
    const evolutionChain = await Promise.all(promises);
    setEvolution(evolutionChain);
  };

  const getEvolution = () => {
    const type = evolution ? evolution[0].types[0].type.name : '';
    const content = contents.find((content) => content.type === type);
    const color = content?.defaultColor;
    const evolutionList = evolution?.map((pokemon) => {
      return (
        <figure className={styles.imageWrapper} key={pokemon.name}>
          <p style={{ backgroundColor: color }} className={styles.pokemonName}>
            {pokemon.name}
          </p>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            layout="fill"
          />
        </figure>
      );
    });
    return <div className={styles.evolutionWrapper}>{evolutionList}</div>;
  };

  useEffect(() => {
    fetchEvolution();
  }, []);

  return (
    <section className={styles.evolutionContainer}>
      <h2 className={styles.evolutionTitle}>Evolution</h2>
      {getEvolution()}
    </section>
  );
};

export default Evolution;
