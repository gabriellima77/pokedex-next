import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Card from '../../../components/Card';
import { pokemon, Pokemons } from '../../pokemonType';
import styles from '../../../styles/Home.module.css';
import TypeCarousel from '../../../components/TypeCarousel';

const Type = ({ pokemon }: any) => {
  const { ids } = pokemon;
  const type = pokemon.types[0].type.name;
  const [filteredList, setFilteredList] = useState<Pokemons>([]);

  const getPokemons = async () => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      if (+ids[i] > 251) break;
      const res = fetch(`https://pokeapi.co/api/v2/pokemon/${+ids[i]}`).then(
        (resp) => resp.json()
      );
      promises.push(res);
    }

    const pokemons = await Promise.all(promises);
    setFilteredList(pokemons);
  };

  useEffect(() => {
    setFilteredList([]);
    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

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
      <TypeCarousel currentType={type} />
      <div className={styles.grid}>{getCards()}</div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context.params?.type;
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  const pokemonsList: Array<any> = data.pokemon;

  //get all ids
  let ids = pokemonsList.map((pokemon) => {
    const url: string = pokemon.pokemon.url;
    const match = url.match(/\d/g);
    let id;
    if (match) id = match.slice(1).join('');
    else id = '';
    return id;
  });

  const types = [{ type: { name: type } }];
  const pokemon = { types, ids };

  return {
    props: {
      pokemon,
    },
  };
};

export default Type;
