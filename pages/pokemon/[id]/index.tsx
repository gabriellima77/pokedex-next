import { GetServerSideProps } from 'next';
import React from 'react';
import Meta from '../../../components/Meta';
import { pokemon } from '../../pokemonType';

interface pokemonProps {
  pokemon: pokemon;
  setType: (a: string) => void;
}

const Pokemon = ({ pokemon }: pokemonProps) => {
  console.log(pokemon);
  const title = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

  // <Meta title={article.title} />
  // <h1>{article.title}</h1>
  // <p>{article.body}</p>
  // <br />
  // <Link href="/">Go Back</Link>
  return (
    <>
      <Meta title={title} />
      <section></section>
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
