import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainPageApi } from '../../../api';

export default function AdminMainPagePage() {
  const [mainPage, setMainPage] = useState(null);
  const [formData, setFormData] = useState({ info: '', contacts: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    MainPageApi.get()
      .then(data => {
        setMainPage(data);
        setFormData({
          info: data.info || '',
          contacts: data.contacts || '',
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.info.trim() || !formData.contacts.trim()) {
      setError('Заполните все поля!');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const updated = await MainPageApi.update({
        info: formData.info,
        contacts: formData.contacts,
      });

      setMainPage(updated);
      setSuccess('✅ Изменения сохранены!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Ошибка: ' + err.message);
    } finally {
      setSaving(false);
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
              <h2>🏠 Редактирование главной страницы</h2>
            </header>

            {error && (
              <div style={{
                background: '#ffebee',
                color: '#d32f2f',
                padding: '10px 15px',
                borderRadius: '5px',
                marginBottom: '15px',
                border: '1px solid #d32f2f',
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                background: '#e8f5e9',
                color: '#2e7d32',
                padding: '10px 15px',
                borderRadius: '5px',
                marginBottom: '15px',
                border: '1px solid #2e7d32',
              }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSave}>
              {/* ИНФОРМАЦИЯ О ЗООПАРКЕ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  ℹ️ Информация о зоопарке
                </label>
                <textarea
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    minHeight: '150px',
                    fontSize: '14px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Это описание будет показано на главной странице
                </p>
              </div>

              {/* КОНТАКТЫ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  📍 Контакты и адрес
                </label>
                <textarea
                  value={formData.contacts}
                  onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    minHeight: '150px',
                    fontSize: '14px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Адрес, телефон, часы работы и другая информация
                </p>
              </div>

              {/* ИНФОРМАЦИЯ ОБ ОБНОВЛЕНИИ */}
              {mainPage && (
                <div style={{
                  background: '#f0f8ff',
                  padding: '15px',
                  borderRadius: '5px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  color: '#666',
                }}>
                  <p>
                    <strong>Последнее обновление:</strong><br />
                    {mainPage.updatedAt ? new Date(mainPage.updatedAt).toLocaleString('ru-RU') : 'Не указано'}
                  </p>
                </div>
              )}

              {/* КНОПКА СОХРАНИТЬ */}
              <button
                type="submit"
                disabled={saving}
                className="button"
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? '⏳ Сохранение...' : '💾 Сохранить изменения'}
              </button>
            </form>

            {/* ПРЕДПРОСМОТР */}
            <div style={{
              marginTop: '40px',
              background: '#f9f9f9',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}>
              <h3>👁️ Предпросмотр</h3>

              <h4>Информация:</h4>
              <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
                {formData.info || '(пусто)'}
              </p>

              <h4 style={{ marginTop: '20px' }}>Контакты:</h4>
              <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
                {formData.contacts || '(пусто)'}
              </p>
            </div>

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