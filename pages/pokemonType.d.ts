export type Pokemons = Array<pokemon>;

export interface pokemon {
  name: string;
  id: number;
  sprites: sprites;
  types: arrayTypes;
  stats: arrayStats;
  height: number;
  species: species;
}

type species = {
  url: string;
}

type arrayStats = Array<stats>;

interface stats {
  base_stat: number;
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