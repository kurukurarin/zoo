// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { useApi } from '../../hooks/useApi'

// export default function AnimalsPage() {
//     const { data: animals} = useApi('api/animals') // << !! мб переделать сслыку

//     if (loading)

//     return (
//         <div>
            
//         </div>
//     )
// }






import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimalApi } from '../../api';

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Загружаем животных при загрузке страницы
  useEffect(() => {
    AnimalApi.getAll()
      .then(animals => {
        setAnimals(animals);
        setFilteredAnimals(animals);
      })
      .catch(err => {
        console.error('Ошибка при загрузке животных:', err);
        setError(err.message || 'Ошибка загрузки животных');
      })
      .finally(() => setLoading(false));
  }, []);

  // Фильтруем животных при изменении поиска
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAnimals(animals);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = animals.filter(animal =>
        animal.name.toLowerCase().includes(query) ||
        animal.feature.toLowerCase().includes(query)
      );
      setFilteredAnimals(filtered);
    }
  }, [searchQuery, animals]);

  if (loading) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <header>
                <h2>⏳ Загрузка животных...</h2>
              </header>
            </article>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <header>
                <h2>❌ Ошибка: {error}</h2>
              </header>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="page-wrapper">
      <div className="wrapper">
        <div className="container" id="main">
          <article id="content">
            <header>
              <h2>🦁 Наши животные</h2>
            </header>

            {/* ПОИСК */}
            <div style={{ marginBottom: '30px' }}>
              <input
                type="text"
                placeholder="🔍 Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  fontSize: '14px',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                }}
              />
              {searchQuery && (
                <p style={{ color: '#666', marginTop: '10px' }}>
                  Найдено: <strong>{filteredAnimals.length}</strong> животных
                </p>
              )}
            </div>

            {/* СЕТКА ЖИВОТНЫХ */}
            {filteredAnimals.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: '#f9f9f9',
                borderRadius: '8px',
              }}>
                <p style={{ fontSize: '18px', color: '#666' }}>
                  😔 Животные не найдены
                </p>
                {searchQuery && (
                  <button
                    className="button"
                    onClick={() => setSearchQuery('')}
                    style={{ marginTop: '15px' }}
                  >
                    Сбросить поиск
                  </button>
                )}
              </div>
            ) : (
              <div className="row features">
                {filteredAnimals.map(animal => (
                  <section key={animal.id} className="col-4 col-12-narrower feature">
                    <div className="image-wrapper">
                      <img
                        src={animal.mainPhotoUrl || '/images/pic03.jpg'}
                        alt={animal.name}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                    <header>
                      <h3>{animal.name}</h3>
                    </header>
                    <p>{animal.feature}</p>
                    <ul className="actions">
                      <li>
                        <Link
                          to={`/animals/${animal.id}`}
                          className="button"
                        >
                          Подробнее
                        </Link>
                      </li>
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {/* СТАТИСТИКА */}
            {animals.length > 0 && (
              <p style={{
                textAlign: 'center',
                marginTop: '30px',
                color: '#666',
                fontSize: '14px',
              }}>
                Отображено: <strong>{filteredAnimals.length}</strong> из{' '}
                <strong>{animals.length}</strong> животных
              </p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}