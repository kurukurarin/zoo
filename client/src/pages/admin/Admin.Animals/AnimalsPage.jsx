import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimalApi } from '../../../api';

export default function AdminAnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    feature: '',
    mainPhotoUrl: '',
  });

  // Загружаем животных
  useEffect(() => {
    AnimalApi.getAll()
      .then(animals => setAnimals(animals))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Создаем животное
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.feature.trim()) {
      alert('Заполните все поля!');
      return;
    }

    try {
      const created = await AnimalApi.create({
        name: formData.name,
        feature: formData.feature,
        mainPhotoUrl: formData.mainPhotoUrl || 'https://via.placeholder.com/400',
      });

      setAnimals([...animals, created]);
      setFormData({ name: '', feature: '', mainPhotoUrl: '' });
      setShowForm(false);
      alert('✅ Животное создано!');
    } catch (err) {
      alert('❌ Ошибка: ' + err.message);
    }
  };

  // Удаляем животное
  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены?')) return;

    try {
      await AnimalApi.delete(id);
      setAnimals(animals.filter(a => a.id !== id));
      alert('✅ Животное удалено!');
    } catch (err) {
      alert('❌ Ошибка: ' + err.message);
    }
  };

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

  return (
    <div id="page-wrapper">
      <div className="wrapper">
        <div className="container" id="main">
          <article id="content">
            <header>
              <h2>🦁 Управление животными</h2>
            </header>

            {error && (
              <div style={{
                background: '#ffebee',
                color: '#d32f2f',
                padding: '10px 15px',
                borderRadius: '5px',
                marginBottom: '15px',
              }}>
                ❌ {error}
              </div>
            )}

            {/* КНОПКА ДОБАВИТЬ */}
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setShowForm(!showForm)}
                className="button"
                style={{ background: '#4CAF50', color: 'white' }}
              >
                {showForm ? '✖️ Отмена' : '➕ Добавить животное'}
              </button>
            </div>

            {/* ФОРМА СОЗДАНИЯ */}
            {showForm && (
              <form onSubmit={handleCreate} style={{
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
              }}>
                <h3>Новое животное</h3>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Название
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Лев"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Описание
                  </label>
                  <textarea
                    placeholder="Описание животного"
                    value={formData.feature}
                    onChange={(e) => setFormData({ ...formData, feature: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxSizing: 'border-box',
                      minHeight: '100px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    URL фото (опционально)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.mainPhotoUrl}
                    onChange={(e) => setFormData({ ...formData, mainPhotoUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="button"
                  style={{ background: '#4CAF50', color: 'white' }}
                >
                  ✅ Создать
                </button>
              </form>
            )}

            {/* СПИСОК ЖИВОТНЫХ */}
            <h3>Все животные ({animals.length})</h3>

            {animals.length === 0 ? (
              <p style={{ color: '#666' }}>Животные еще не добавлены</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}>
                  <thead>
                    <tr style={{ background: '#f0f0f0' }}>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Название</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Описание</th>
                      <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animals.map(animal => (
                      <tr key={animal.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{animal.id}</td>
                        <td style={{ padding: '10px', fontWeight: '600' }}>{animal.name}</td>
                        <td style={{ padding: '10px', color: '#666' }}>
                          {animal.feature.substring(0, 50)}...
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDelete(animal.id)}
                            style={{
                              background: '#ea3655',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                          >
                            🗑️ Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ССЫЛКА ВЕРНУТЬСЯ */}
            <ul className="actions" style={{ marginTop: '30px' }}>
              <li>
                <Link to="/admin" className="button">
                  ← Вернуться на главную
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}