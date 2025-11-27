import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthApi } from '../../api';

export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущего администратора
    AuthApi.getCurrentAdmin()
      .then(admin => {
        setAdmin(admin);
      })
      .catch(err => {
        console.error('Ошибка при загрузке администратора:', err);
        // Перенаправляем на логин если ошибка
        window.location.href = '/login';
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await AuthApi.logout();
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      console.error('Ошибка при логауте:', err);
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
              <h2>⚙️ Панель администратора</h2>
            </header>

            {/* ПРОФИЛЬ */}
            {admin && (
              <div style={{
                background: '#f0f8ff',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
              }}>
                <h3>👤 Ваш профиль</h3>
                <p>
                  <strong>Email:</strong> {admin.email}
                </p>
                <p>
                  <strong>Роль:</strong> {admin.role || 'Администратор'}
                </p>
                <p>
                  <strong>Статус:</strong> {admin.isActive ? '✅ Активен' : '❌ Неактивен'}
                </p>
              </div>
            )}

            {/* МЕНЮ */}
            <h3>📋 Управление</h3>
            <p>Выберите раздел для редактирования:</p>

            <div className="row features">
              {/* ЖИВОТНЫЕ */}
              <section className="col-4 col-12-narrower feature">
                <header>
                  <h3>🦁 Животные</h3>
                </header>
                <p>Добавляйте, редактируйте и удаляйте животных из зоопарка</p>
                <ul className="actions">
                  <li>
                    <Link to="/admin/animals" className="button">
                      Управлять животными
                    </Link>
                  </li>
                </ul>
              </section>

              {/* ГЛАВНАЯ СТРАНИЦА */}
              <section className="col-4 col-12-narrower feature">
                <header>
                  <h3>🏠 Главная страница</h3>
                </header>
                <p>Редактируйте информацию и контакты на главной странице</p>
                <ul className="actions">
                  <li>
                    <Link to="/admin/main-page" className="button">
                      Редактировать
                    </Link>
                  </li>
                </ul>
              </section>

              {/* ТАРИФЫ */}
              <section className="col-4 col-12-narrower feature">
                <header>
                  <h3>💰 Тарифы</h3>
                </header>
                <p>Устанавливайте и изменяйте цены на билеты</p>
                <ul className="actions">
                  <li>
                    <Link to="/admin/tariffs" className="button">
                      Управлять тарифами
                    </Link>
                  </li>
                </ul>
              </section>
            </div>

            {/* БЫСТРЫЕ ССЫЛКИ */}
            <h3 style={{ marginTop: '40px' }}>🔗 Быстрые ссылки</h3>
            <ul style={{ lineHeight: '2' }}>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  📱 Посмотреть сайт →
                </a>
              </li>
              <li>
                <a href="/animals" target="_blank" rel="noopener noreferrer">
                  🦁 Список животных →
                </a>
              </li>
              <li>
                <a href="/tariffs" target="_blank" rel="noopener noreferrer">
                  💰 Тарифы →
                </a>
              </li>
            </ul>

            {/* ВЫХОД */}
            <div style={{ marginTop: '40px' }}>
              <button
                onClick={handleLogout}
                className="button"
                style={{
                  background: '#ea3655',
                  color: 'white',
                }}
              >
                🔓 Выход
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}