import React from 'react';

export const Main = () => {
  const notes = [
    {
      id: 1,
      title: 'Новая кошка в доме',
      content:
        'Сегодня к нам приехала кошечка Мурка, она уже изучает все уголки квартиры!',
    },
    {
      id: 2,
      title: 'Прогулка с собакой',
      content: 'Выгуляли Шарика в парке, познакомились с другими питомцами.',
    },
    {
      id: 3,
      title: 'Совет по уходу',
      content: 'Регулярная чистка зубов у кота помогает предотвратить болезни.',
    },
  ];

  const images = [
    'https://placedog.net/300/200?id=21',
    'https://placecats.com/300/200?1',
    'https://placedog.net/300/200?id=22',
    'https://placecats.com/300/200?2',
  ];

  return (
    <main style={styles.main}>
      <h2>Добро пожаловать в PetHub!</h2>
      <p>Здесь вы можете делиться историями о своих питомцах 🐾</p>

      <section style={styles.gallery}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Pet ${idx}`} style={styles.img} />
        ))}
      </section>

      <section style={styles.notes}>
        {notes.map((note) => (
          <article key={note.id} style={styles.note}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

const styles = {
  main: { padding: '2rem', textAlign: 'center' },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  img: { width: '100%', borderRadius: '10px' },
  notes: {
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  note: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
};
