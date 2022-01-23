import React from 'react';
import Head from 'next/head';

interface metaProps {
  title: string;
  keywords: string;
  description: string;
}

const Meta = ({ title, keywords, description }: metaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'PokeDex',
  keywords: 'Pokemon, Anime, Game',
  description: 'Everything about Pokemons.',
};

export default Meta;
