import React from 'react';
import Bug from './Bug';
import Dark from './Dark';
import Dragon from './Dragon';
import Electric from './Electric';
import Fairy from './Fairy';
import Fighting from './Fighting';
import Fire from './Fire';
import Flying from './Flying';
import Ghost from './Ghost';
import Grass from './Grass';
import Ground from './Ground';
import Ice from './Ice';
import Normal from './Normal';
import Poison from './Poison';
import Psychic from './Psychic';
import Rock from './Rock';
import Steel from './Steel';
import Water from './Water';
import PokeBall from './PokeBall';
import PokeBallFull from './PokeBallFull';

interface svgProps {
  color?: string;
  width?: number;
  opacity?: number;
  classList?: string;
  type?: string;
}

export const getSVG = ({
  color,
  width,
  type,
  opacity,
  classList,
}: svgProps) => {
  switch (type) {
    case 'bug':
      return <Bug color={color} width={width} classList={classList} />;
    case 'dark':
      return <Dark color={color} width={width} classList={classList} />;
    case 'dragon':
      return <Dragon color={color} width={width} classList={classList} />;
    case 'electric':
      return <Electric color={color} width={width} classList={classList} />;
    case 'fairy':
      return <Fairy color={color} width={width} classList={classList} />;
    case 'fighting':
      return <Fighting color={color} width={width} classList={classList} />;
    case 'fire':
      return <Fire color={color} width={width} classList={classList} />;
    case 'flying':
      return <Flying color={color} width={width} classList={classList} />;
    case 'ghost':
      return <Ghost color={color} width={width} classList={classList} />;
    case 'grass':
      return <Grass color={color} width={width} classList={classList} />;
    case 'ground':
      return <Ground color={color} width={width} classList={classList} />;
    case 'ice':
      return <Ice color={color} width={width} classList={classList} />;
    case 'normal':
      return <Normal color={color} width={width} classList={classList} />;
    case 'poison':
      return <Poison color={color} width={width} classList={classList} />;
    case 'psychic':
      return <Psychic color={color} width={width} classList={classList} />;
    case 'rock':
      return <Rock color={color} width={width} classList={classList} />;
    case 'steel':
      return <Steel color={color} width={width} classList={classList} />;
    case 'water':
      return <Water color={color} width={width} classList={classList} />;
    case 'pokeball':
      return <PokeBallFull width={width} classList={classList} />;
    default:
      return (
        <PokeBall
          color={color}
          width={width}
          classList={classList}
          opacity={opacity}
        />
      );
  }
};
