import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { pokemon } from './pokemonType';

const Home: NextPage = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const getCards = () =>
    pokemons.map((pokemon: pokemon) => {
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
  for (let i = 0; i < 9; i++) {
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
