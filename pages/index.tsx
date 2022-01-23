import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { getSVG } from '../components/SVG/GetSVG';

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Card title="teste" id={5} type="fire" imageUrl="" />
      </div>
    </main>
  );
};

export default Home;
