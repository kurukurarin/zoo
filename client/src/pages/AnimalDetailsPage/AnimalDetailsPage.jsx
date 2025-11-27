// import { Link } from "react-router";

// export default function AnimalDetailsPage() {
    
// }




import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimalApi, PhotoApi, InfoApi } from '../../api';

export default function AnimalDetailsPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    // Загружаем животное
    AnimalApi.getById(id)
      .then(animal => {
        setAnimal(animal);
        
        // Загружаем фотографии
        return PhotoApi.getByAnimalId(id)
          .then(photos => {
            setPhotos(photos);
            
            // Загружаем информацию
            return InfoApi.getByAnimalId(id);
          })
          .then(info => {
            setInfo(info);
          });
      })
      .catch(err => {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message || 'Ошибка загрузки');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <h2>⏳ Загрузка...</h2>
            </article>
          </div>
        </div>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <h2>❌ Ошибка: {error || 'Животное не найдено'}</h2>
              <Link to="/animals" className="button">
                ← Вернуться к списку
              </Link>
            </article>
          </div>
        </div>
      </div>
    );
  }

  const selectedPhoto = photos[selectedPhotoIndex];

  return (
    <div id="page-wrapper">
      <div className="wrapper">
        <div className="container" id="main">
          <article id="content">
            <header>
              <h2>{animal.name}</h2>
            </header>

            {/* ОСНОВНОЕ ФОТО */}
            {selectedPhoto ? (
              <img
                src={selectedPhoto.photoUrl}
                alt={animal.name}
                className="image featured"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            ) : animal.mainPhotoUrl ? (
              <img
                src={animal.mainPhotoUrl}
                alt={animal.name}
                className="image featured"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            ) : null}

            {/* ГАЛЕРЕЯ ФОТО */}
            {photos.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '10px',
                marginTop: '20px',
                marginBottom: '20px',
              }}>
                {/* Основное фото */}
                <div
                  onClick={() => setSelectedPhotoIndex(-1)}
                  style={{
                    cursor: 'pointer',
                    border: selectedPhotoIndex === -1 ? '3px solid #f09433' : 'none',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={animal.mainPhotoUrl}
                    alt="Main"
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Остальные фото */}
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(index)}
                    style={{
                      cursor: 'pointer',
                      border: selectedPhotoIndex === index ? '3px solid #f09433' : 'none',
                      borderRadius: '5px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={photo.photoUrl}
                      alt={`Photo ${index}`}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ОПИСАНИЕ */}
            <h3>О {animal.name}</h3>
            <p>{animal.feature}</p>

            {/* ИНФОРМАЦИЯ */}
            {info.length > 0 && (
              <>
                <h3>Интересные факты</h3>
                {info.map((item, index) => (
                  <div key={item.id} style={{ marginBottom: '20px' }}>
                    <h4>Факт {index + 1}</h4>
                    <p>{item.description}</p>
                    {item.facts && (
                      <p style={{ fontStyle: 'italic', color: '#666' }}>
                        {item.facts}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* КНОПКА НАЗАД */}
            <ul className="actions">
              <li>
                <Link to="/animals" className="button">
                  ← Вернуться к списку
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}