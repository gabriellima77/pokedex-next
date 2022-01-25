import React, { useState, useEffect } from 'react';

import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { pokemon, Pokemons } from './pokemonType';

const Home: NextPage = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredList, setFilteredList] = useState<Pokemons>(pokemons);

  const loadMore = async () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight;
    if (scrollPosition >= bottom) {
      const lastValue = filteredList.length;
      const newValue = lastValue + 20 >= 493 ? 493 : lastValue + 20;
      const list: Pokemons = [];
      for (let i = lastValue; i < newValue; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const pokemon = await res.json();
        list.push(pokemon);
      }
      setFilteredList((prev) => [...prev, ...list]);
    }
  };

  useEffect(() => {
    // Removendo e adicionando evento para mudar a referência da lista
    window.removeEventListener('scroll', loadMore);
    if (filteredList.length < 493) window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredList]);

  const getCards = () =>
    filteredList.map((pokemon: pokemon) => {
      return (
        <Link
          key={pokemon.id}
          href="/pokemon/[id]"
          as={`/pokemon/${pokemon.id}`}
        >
          <a>
            <Card
              title={pokemon.name}
              id={pokemon.id}
              type={pokemon.types[0].type.name}
              imageUrl={pokemon.sprites.front_default}
            />
          </a>
        </Link>
      );
    });

  return (
    <main className={styles.main}>
      <div className={styles.grid}>{getCards()}</div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const list = [];
  for (let i = 0; i < 20; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const pokemon = await res.json();
    list.push(pokemon);
  }
  return {
    props: {
      pokemons: list,
    },
  };
};

export default Home;
