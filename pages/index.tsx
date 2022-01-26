import React, { useState, useEffect, useContext } from 'react';
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { pokemon, Pokemons } from './pokemonType';
import { SearchContext } from '../components/Layout';

const Home: NextPage = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [allPokemons, setAllPokemons] = useState<Pokemons>(pokemons);
  const [filteredList, setFilteredList] = useState<Pokemons>(pokemons);
  const searchValue = useContext(SearchContext);

  // Load 30 more pokemon cards
  const loadMore = async () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight;
    if (scrollPosition >= bottom) {
      const lastValue = allPokemons.length;
      const newValue = lastValue + 30 >= 251 ? 251 : lastValue + 30;
      const list: Pokemons = [];
      for (let i = lastValue; i < newValue; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const pokemon = await res.json();
        list.push(pokemon);
      }
      setAllPokemons((prev) => [...prev, ...list]);
    }
  };

  useEffect(() => {
    const search = searchValue.toLowerCase();
    setFilteredList(
      allPokemons.filter((pokemon) => pokemon.name.includes(search))
    );

    // Removendo e adicionando evento para mudar a referência da lista
    window.removeEventListener('scroll', loadMore);
    if (search) return;

    setFilteredList(allPokemons);
    if (allPokemons.length < 251) window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemons, searchValue]);

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
  // Get the first 30 pokemons data
  for (let i = 0; i < 30; i++) {
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
