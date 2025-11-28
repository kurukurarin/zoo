import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TariffApi } from '../../../api';

export default function AdminTariffsPage() {
  const [tariff, setTariff] = useState(null);
  const [formData, setFormData] = useState({
    tariff_weekdays: '',
    tariff_weekend: '',
    benefits: '',
    conditions: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    TariffApi.get()
      .then(data => {
        setTariff(data);
        setFormData({
          tariff_weekdays: data.tariff_weekdays || '',
          tariff_weekend: data.tariff_weekend || '',
          benefits: data.benefits || '',
          conditions: data.conditions || '',
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.tariff_weekdays || !formData.tariff_weekend) {
      setError('Заполните тарифы!');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const updated = await TariffApi.update({
        tariff_weekdays: parseFloat(formData.tariff_weekdays),
        tariff_weekend: parseFloat(formData.tariff_weekend),
        benefits: formData.benefits,
        conditions: formData.conditions,
      });

      setTariff(updated);
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
              <h2>💰 Редактирование тарифов</h2>
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
              {/* ТАРИФ ПО БУДНЯМ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  💰 Тариф по будням (Пн-Пт) - ₽
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.tariff_weekdays}
                  onChange={(e) => setFormData({ ...formData, tariff_weekdays: e.target.value })}
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* ТАРИФ ПО ВЫХОДНЫМ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  💰 Тариф по выходным (Сб-Вс) - ₽
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.tariff_weekend}
                  onChange={(e) => setFormData({ ...formData, tariff_weekend: e.target.value })}
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* ЛЬГОТЫ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  ✨ Льготы
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="Информация о льготах (пенсионеры, студенты, дети и т.д.)"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    minHeight: '100px',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* УСЛОВИЯ */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  fontSize: '16px',
                }}>
                  📋 Условия посещения
                </label>
                <textarea
                  value={formData.conditions}
                  onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                  placeholder="Правила посещения, описание, важные замечания"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    minHeight: '100px',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* ИНФОРМАЦИЯ ОБ ОБНОВЛЕНИИ */}
              {tariff && (
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
                    {tariff.updatedAt ? new Date(tariff.updatedAt).toLocaleString('ru-RU') : 'Не указано'}
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

              <div style={{ marginBottom: '15px' }}>
                <h4>По будням: <span style={{ color: '#f09433', fontSize: '24px' }}>
                  {formData.tariff_weekdays || '0'} ₽
                </span></h4>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4>По выходным: <span style={{ color: '#ea3655', fontSize: '24px' }}>
                  {formData.tariff_weekend || '0'} ₽
                </span></h4>
              </div>

              {formData.benefits && (
                <div>
                  <h4>Льготы:</h4>
                  <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
                    {formData.benefits}
                  </p>
                </div>
              )}

              {formData.conditions && (
                <div>
                  <h4>Условия:</h4>
                  <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>
                    {formData.conditions}
                  </p>
                </div>
              )}
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