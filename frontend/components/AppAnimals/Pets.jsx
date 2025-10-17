import React, { useState } from 'react';

export const Pets = () => {
  const pets = [
    {
      id: 1,
      name: 'Барсик',
      img: 'https://placecats.com/300/200',
      desc: 'Барсик — любопытный кот, который обожает лазить по шторам.',
    },
    {
      id: 2,
      name: 'Шарик',
      img: 'https://placedog.net/300/200?id=15',
      desc: 'Шарик — добрейший пёс, готов дружить с каждым прохожим.',
    },
    {
      id: 3,
      name: 'Дристан',
      img: 'https://placedog.net/300/200?id=10',
      desc: 'Дристан умеет говорить три слова и любит музыку.',
    },
  ];

  // Состояние формы
  const [formData, setFormData] = useState({ photo: '', story: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Данные формы:', formData);

    // Пример отправки на сервер (сервер пока не реализован)
    // await fetch('/api/pets', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    // Очистка формы после отправки
    setFormData({ photo: '', story: '' });
  };

  return (
    <main style={styles.main}>
      <h2>Наши питомцы</h2>
      <p>Здесь вы можете делиться историями о своих питомцах 🐾</p>

      <section style={styles.gallery}>
        {pets.map((pet) => (
          <article key={pet.id} style={styles.card}>
            <img src={pet.img} alt={pet.name} style={styles.img} />
            <h3>{pet.name}</h3>
            <p>{pet.desc}</p>
          </article>
        ))}
      </section>

      <section style={styles.formSection}>
        <h3>Добавить свою историю</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="photo"
            placeholder="Ссылка на фото питомца"
            value={formData.photo}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="story"
            placeholder="Ваша история"
            value={formData.story}
            onChange={handleChange}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Опубликовать
          </button>
        </form>
      </section>
    </main>
  );
};

const styles = {
  main: { padding: '2rem', textAlign: 'center' },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  img: { width: '100%', borderRadius: '10px', marginBottom: '0.5rem' },
  formSection: { marginTop: '2rem' },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: { padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' },
  textarea: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  button: {
    padding: '0.7rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};
