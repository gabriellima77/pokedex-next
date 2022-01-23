import React from 'react';
import Bug from './Bug';
import Dark from './Dark';
import Fire from './Fire';
import Grass from './Grass';
import Water from './Water';
import PokeBall from './PokeBall';

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
    case 'fire':
      return <Fire color={color} width={width} classList={classList} />;
    case 'water':
      return <Water color={color} width={width} classList={classList} />;
    case 'grass':
      return <Grass color={color} width={width} classList={classList} />;
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
