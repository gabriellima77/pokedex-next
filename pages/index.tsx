import type { GetStaticProps, NextPage, InferGetStaticPropsType } from 'next';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';

type Pokemons = Array<pokemon>;

interface pokemon {
  name: string;
  id: number;
  sprites: sprites;
  types: arrayTypes;
  stats: arrayStats;
}

type arrayStats = Array<stats>;

interface stats {
  base_stats: string;
  stat: {
    name: string;
  };
}

interface sprites {
  front_default: string;
  back_default: string;
}

type arrayTypes = Array<types>;

interface types {
  type: {
    name: string;
  };
}

const Home: NextPage = ({
  pokemons,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(pokemons);
  const getCards = () =>
    pokemons.map((pokemon: pokemon) => {
      return (
        <Card
          key={pokemon.id}
          title={pokemon.name}
          id={pokemon.id}
          type={pokemon.types[0].type.name}
          imageUrl={pokemon.sprites.front_default}
        />
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
