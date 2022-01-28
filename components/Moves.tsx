import React from 'react';
import styles from '../styles/Moves.module.css';
import { contents } from '../data';

interface movesProps {
  moves: moves;
  type: string;
}

type moves = [
  {
    move: move;
    version_group_details: details;
  }
];

interface move {
  name: string;
}

type details = [
  {
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
  }
];

const Moves = ({ moves, type }: movesProps) => {
  const content = contents.find((content) => content.type === type);
  const color = content?.defaultColor;

  const getMoves = () => {
    const sortedMoves = moves.sort((a, b) => {
      const methodA = a.version_group_details[0].move_learn_method.name;
      const methodB = b.version_group_details[0].move_learn_method.name;
      return methodA > methodB ? 1 : -1;
    });
    return sortedMoves.map((move) => {
      const moveName = move.move.name.replace('-', ' ').toUpperCase();
      let method = move.version_group_details[0].move_learn_method.name;
      const lvl = move.version_group_details[0].level_learned_at;
      method = method.replace('-', ' ').toUpperCase();
      return (
        <tr key={moveName}>
          <td title={'' + lvl}>{lvl}</td>
          <td title={moveName}>{moveName}</td>
          <td title={method}>{method}</td>
        </tr>
      );
    });
  };

  return (
    <section className={styles.movesContainer}>
      <h2>Moves</h2>
      <table className={styles.table}>
        <thead style={{ background: color }}>
          <tr>
            <th>Level</th>
          </tr>
          <tr>
            <th>Move</th>
          </tr>
          <tr>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>{getMoves()}</tbody>
      </table>
    </section>
  );
};

export default Moves;
