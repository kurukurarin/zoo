// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { useApi } from '../../hooks/useApi'

// export default function AnimalsPage() {
//     const { data: tariffs} = useApi('api/tariffs') // << !! мб переделать сслыку

//     return (
//         <div>
            
//         </div>
//     )
// }




import React, { useEffect, useState } from 'react';
import { TariffApi } from '../../api';

export default function TariffsPage() {
  const [tariff, setTariff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    TariffApi.get()
      .then(tariff => {
        setTariff(tariff);
      })
      .catch(err => {
        console.error('Ошибка при загрузке тарифов:', err);
        setError(err.message || 'Ошибка загрузки тарифов');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <h2>⏳ Загрузка тарифов...</h2>
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
              <h2>❌ Ошибка: {error}</h2>
            </article>
          </div>
        </div>
      </div>
    );
  }

  if (!tariff) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <h2>Тарифы не найдены</h2>
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
              <h2>🎟️ Тарифы посещения</h2>
            </header>

            {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
            <p>
              Приветствуем вас в нашем зоопарке! Ознакомьтесь с нашими доступными тарифами на посещение.
            </p>

            {/* ТАРИФЫ */}
            <div className="row features">
              <section className="col-6 col-12-narrower feature">
                <header>
                  <h3>💰 По будням</h3>
                </header>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#f09433',
                  margin: '20px 0',
                }}>
                  {tariff.tariff_weekdays} ₽
                </div>
                <p style={{ color: '#666' }}>
                  Понедельник - Пятница
                </p>
              </section>

              <section className="col-6 col-12-narrower feature">
                <header>
                  <h3>💰 По выходным</h3>
                </header>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#ea3655',
                  margin: '20px 0',
                }}>
                  {tariff.tariff_weekend} ₽
                </div>
                <p style={{ color: '#666' }}>
                  Суббота - Воскресенье
                </p>
              </section>
            </div>

            {/* ЛЬГОТЫ */}
            {tariff.benefits && (
              <div style={{
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '30px',
                marginBottom: '20px',
              }}>
                <h3>✨ Льготы</h3>
                <p>{tariff.benefits}</p>
              </div>
            )}

            {/* УСЛОВИЯ */}
            {tariff.conditions && (
              <div style={{
                background: '#f0f8ff',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '20px',
                marginBottom: '20px',
              }}>
                <h3>📋 Условия посещения</h3>
                <p>{tariff.conditions}</p>
              </div>
            )}

            {/* ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ */}
            <h3>ℹ️ Важная информация</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Билеты действительны только в день приобретения</li>
              <li>Дети до 3 лет посещают бесплатно</li>
              <li>Группам от 10 человек предоставляются скидки</li>
              <li>Парковка на территории зоопарка бесплатна</li>
              <li>Пикники разрешены в специально отведённых местах</li>
            </ul>

            {/* КНОПКА ВЕРНУТЬСЯ */}
            <ul className="actions" style={{ marginTop: '30px' }}>
              <li>
                <a href="/" className="button">
                  ← На главную
                </a>
              </li>
              <li>
                <a href="/animals" className="button">
                  Смотреть животных →
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}