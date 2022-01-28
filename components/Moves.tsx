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
          <td>{lvl}</td>
          <td>{moveName}</td>
          <td>{method}</td>
        </tr>
      );
    });
  };

  return (
    <section className={styles.movesContainer}>
      <h2>Moves</h2>
      <table className={styles.table}>
        <thead style={{ background: color }}>
          <th>Level</th>
          <th>Move</th>
          <th>Method</th>
        </thead>
        <tbody>{getMoves()}</tbody>
      </table>
    </section>
  );
};

export default Moves;
