import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Pokemons } from '../pages/pokemonType';
import evolutionStyles from '../styles/Evolution.module.css';
import { contents } from '../data';
import Link from 'next/link';

type evolutionProps = {
  id: number;
};

interface evolution {
  id: number;
  chain: {
    species: { name: string };
    evolves_to: evolves;
  };
}

type evolutionDetails = Array<evolutionDetail>;

interface evolutionDetail {
  trigger: { name: string };
  min_level: number;
  item: {
    name: string;
  };
  min_happiness: number;
  time_of_day: string;
}

type evolves = [
  {
    evolution_details: evolutionDetails;
    species: { name: string };
    evolves_to: evolves;
  }
];

interface createImageProps {
  src: string;
  id: number;
  color?: string;
  name: string;
}

const Evolution = ({ id }: evolutionProps) => {
  const [evolution, setEvolution] = useState<Pokemons>();
  const [triggers, setTriggers] = useState<Array<any>>();

  const fetchEvolution = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const pokemon = await res.json();
    const evolutionURL = pokemon.evolution_chain.url;
    const evolutionRes = await fetch(evolutionURL);
    const evolution: evolution = await evolutionRes.json();
    getEvolutionChain(evolution);
  };

  const getEvolutionChain = async (evolution: evolution) => {
    const { id } = evolution;
    let pokemonsName;
    let triggers = [];
    // set Eevee chain
    if (id === 67) {
      const firstName = evolution.chain.species.name;
      const evolves = evolution.chain.evolves_to.slice(0, 5);
      triggers = evolves.map((ev) => {
        const { item, trigger, min_happiness, time_of_day, min_level } =
          ev.evolution_details[0];
        return { item, trigger, min_happiness, time_of_day, min_level };
      });

      const names = evolves.map((ev) => ev.species.name);
      pokemonsName = [firstName, ...names];
    } else {
      const evolve = evolution.chain.evolves_to[0];
      const firstName = evolution.chain.species.name;
      const secondName = evolve ? evolve.species.name : '';
      let thirdName;
      if (secondName) {
        const { item, trigger, min_happiness, time_of_day, min_level } =
          evolve.evolution_details[0];
        triggers.push({ item, trigger, min_happiness, time_of_day, min_level });
        const nextEvolve = evolution.chain.evolves_to[0].evolves_to[0];
        if (nextEvolve) {
          const { item, trigger, min_happiness, time_of_day, min_level } =
            nextEvolve.evolution_details[0];

          thirdName = nextEvolve ? nextEvolve.species.name : '';
          triggers.push({
            item,
            trigger,
            min_happiness,
            time_of_day,
            min_level,
          });
        }
      }

      const array = [firstName, secondName, thirdName];
      pokemonsName = array.filter((name) => {
        if (name) return name;
      });
    }
    const promises = pokemonsName.map((name) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((resp) =>
        resp.json()
      )
    );
    setTriggers(triggers);
    const evolutionChain = await Promise.all(promises);
    setEvolution(evolutionChain);
  };

  const getTriggers = () => {
    const triggersElements = triggers?.map((tri: evolutionDetail) => {
      const { item, min_happiness, min_level, trigger, time_of_day } = tri;
      let text = '';
      if (trigger.name === 'level-up' && !min_level)
        text = time_of_day + ' happiness: ' + min_happiness;
      else if (trigger.name === 'level-up') text = min_level + '+';
      else if (trigger.name === 'use-item') text = item.name;
      text = text.toUpperCase();
      return (
        <div className={evolutionStyles.trigger} key={text}>
          {text}
          <i className="fas fa-arrow-right"></i>
        </div>
      );
    });
    return triggersElements;
  };

  const getEvolution = () => {
    let evolutionList;
    let classList;

    if (evolution) {
      // If Eevee
      if (evolution.length > 3) {
        // get Eevee Image
        classList = evolutionStyles.evolutionWrapperColumn;
        const firstOne = evolution[0];
        let { name, id } = firstOne;
        const type = firstOne.types[0].type.name;
        const content = contents.find((content) => content.type === type);
        const color = content?.defaultColor;

        name = name[0].toUpperCase() + name.substring(1);
        const props = { name, id, color, src: firstOne.sprites.front_default };
        const firstImage = createImage(props);

        const triggersElements = getTriggers();

        evolutionList = evolution.map((pokemon, index) => {
          if (index === 1) return null;
          let { name, id } = pokemon;
          const type = pokemon.types[0].type.name;
          const content = contents.find((content) => content.type === type);
          const color = content?.defaultColor;
          name = name[0].toUpperCase() + name.substring(1);
          const props = { name, id, color, src: pokemon.sprites.front_default };
          const image = createImage(props);
          return (
            <div className={evolutionStyles.evolutionBox} key={name + id}>
              {firstImage}
              {triggersElements ? triggersElements[index - 1] : null}
              {image}
            </div>
          );
        });
        evolutionList = evolutionList.slice(1);
      } else {
        const triggersElements = getTriggers();
        classList = evolutionStyles.evolutionWrapper;
        evolutionList = evolution.map((pokemon, index) => {
          let { name, id } = pokemon;
          const type = pokemon.types[0].type.name;
          const content = contents.find((content) => content.type === type);
          const color = content?.defaultColor;
          name = name[0].toUpperCase() + name.substring(1);
          const props = { name, id, color, src: pokemon.sprites.front_default };
          return (
            <>
              {createImage(props)}
              {triggersElements && triggersElements[index]
                ? triggersElements[index]
                : null}
            </>
          );
        });
      }
    }
    return <div className={classList}>{evolutionList}</div>;
  };

  const createImage = ({ name, id, color, src }: createImageProps) => {
    return (
      <Link key={name} href="/pokemon/[id]" as={`/pokemon/${id}`}>
        <a>
          <figure className={evolutionStyles.imageWrapper}>
            <p
              style={{ backgroundColor: color }}
              className={evolutionStyles.pokemonName}
            >
              {name}
            </p>
            <Image src={src} alt={name} layout="fill" />
          </figure>
        </a>
      </Link>
    );
  };

  useEffect(() => {
    fetchEvolution();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={evolutionStyles.evolutionContainer}>
      <h2 className={evolutionStyles.evolutionTitle}>Evolution</h2>
      {getEvolution()}
    </section>
  );
};

export default Evolution;
