import React, { useState, useEffect, useContext } from 'react';
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getSVG } from '../components/SVG/GetSVG';
import Card from '../components/Card';
import { pokemon, Pokemons } from './pokemonType';
import { SearchContext } from '../components/Layout';
import TypeCarousel from '../components/TypeCarousel';
import Image from 'next/image';

const Home: NextPage = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [allPokemons, setAllPokemons] = useState<Pokemons>(pokemons);
  const [filteredList, setFilteredList] = useState<Pokemons>(pokemons);
  const [isLoading, setIsLoading] = useState(false);
  const maxPokemons = 251;
  let searchValue = useContext(SearchContext);

  // Add 30 new pokemons to allPokemons state
  const loadMore = async () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const distance = 50;
    const bottom = document.body.offsetHeight - distance;
    if (scrollPosition >= bottom) {
      setIsLoading(true);
      // Remove Event
      window.onscroll = null;
      const lastValue = allPokemons.length;
      const newValue =
        lastValue + 30 >= maxPokemons ? maxPokemons : lastValue + 30;
      const promiseList = [];
      for (let i = lastValue; i < newValue; i++) {
        const res = fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(
          (resp) => resp.json()
        );
        promiseList.push(res);
      }
      Promise.all(promiseList).then((pokemons) => {
        setAllPokemons((prev) => [...prev, ...pokemons]);
      });
    }
  };

  // Search Event
  useEffect(() => {
    // If is search something, isn't loading more pokemons
    // Else more pokemons can be fetched
    if (searchValue) window.onscroll = null;
    else window.onscroll = loadMore;
    const search = searchValue.toLowerCase();
    setFilteredList(
      allPokemons.filter((pokemon) => pokemon.name.includes(search))
    );
    return () => {
      window.onscroll = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  // Loading More Event
  useEffect(() => {
    if (allPokemons.length < maxPokemons) {
      window.onscroll = loadMore;
      setFilteredList(allPokemons);
    } else if (allPokemons.length === maxPokemons) {
      window.onscroll = null;
      setFilteredList(allPokemons);
    }
    setIsLoading(false);
    return () => {
      window.onscroll = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemons]);

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

  const nothingFound = () => {
    return (
      <div className={styles.nothingFound}>
        <figure className={styles.slowpokeWrapper}>
          <Image src="/slowpoke.png" layout="fill" alt="Slowpoke" />
        </figure>
        <h3>Nothing found or Data is not fully loaded!</h3>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <TypeCarousel />
      {filteredList.length > 0 ? (
        <div className={styles.grid}>{getCards()}</div>
      ) : (
        nothingFound()
      )}
      {isLoading ? (
        <div className={styles.loading}>
          {getSVG({ color: '#FF1100', width: 50, opacity: 1 })}
        </div>
      ) : null}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const promiseList = [];
  // Get the first 30 pokemons data
  for (let i = 0; i < 30; i++) {
    const res = fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(
      (resp) => resp.json()
    );
    promiseList.push(res);
  }
  const pokemons = await Promise.all(promiseList);

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
