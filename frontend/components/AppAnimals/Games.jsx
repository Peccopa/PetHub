import React from 'react';

export const Games = () => {
  const games = [
    {
      id: 1,
      name: 'Квест "Найди питомца"',
      desc: 'Найдите спрятанных питомцев на картинке!',
      img: 'https://placedog.net/300/200?id=30',
    },
    {
      id: 2,
      name: 'Викторина о животных',
      desc: 'Проверьте свои знания о животных.',
      img: 'https://placecats.com/300/200?3',
    },
    {
      id: 3,
      name: 'Пазл с питомцами',
      desc: 'Соберите пазл с изображением вашего любимца.',
      img: 'https://placedog.net/300/200?id=31',
    },
    {
      id: 4,
      name: 'Мем-контест',
      desc: 'Придумайте смешной мем с питомцем и поделитесь!',
      img: 'https://placecats.com/300/200?4',
    },
  ];

  return (
    <main style={styles.main}>
      <h2>Игры и активности для любителей животных 🐶🐱</h2>
      <section style={styles.games}>
        {games.map((game) => (
          <article key={game.id} style={styles.card}>
            <img src={game.img} alt={game.name} style={styles.img} />
            <h3>{game.name}</h3>
            <p>{game.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

const styles = {
  main: { padding: '2rem', textAlign: 'center' },
  games: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  img: { width: '100%', borderRadius: '10px', marginBottom: '0.5rem' },
};
