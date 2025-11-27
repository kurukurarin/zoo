import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../../api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // ВАЛИДАЦИЯ
    if (!email.trim()) {
      setError('Введите email!');
      return;
    }

    if (!email.includes('@')) {
      setError('Некорректный email!');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов!');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // ЛОГИН
      const { admin, accessToken } = await AuthApi.login(email, password);

      console.log('✅ Залогинен:', admin.email);
      console.log('✅ Token сохранён');

      // Сохраняем информацию о пользователе (если нужно)
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('token', accessToken);

      // Перенаправляем на админ панель
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Ошибка логина');
      console.error('Ошибка логина:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="page-wrapper">
      <div className="wrapper">
        <div className="container" id="main">
          <article id="content">
            <header>
              <h2>🔐 Вход администратора</h2>
            </header>

            <p style={{ marginBottom: '30px', color: '#666' }}>
              Введите учетные данные для входа в панель администратора
            </p>

            <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
              {/* EMAIL */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@zoo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* ПАРОЛЬ */}
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="password" style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                }}>
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* ОШИБКА */}
              {error && (
                <div style={{
                  background: '#ffebee',
                  color: '#d32f2f',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  fontSize: '14px',
                  border: '1px solid #d32f2f',
                }}>
                  ❌ {error}
                </div>
              )}

              {/* КНОПКА */}
              <button
                type="submit"
                disabled={loading}
                className="button"
                style={{
                  width: '100%',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? '⏳ Загрузка...' : '🔓 Войти'}
              </button>
            </form>

            {/* СПРАВКА */}
            <div style={{
              background: '#f0f8ff',
              padding: '15px',
              borderRadius: '5px',
              marginTop: '30px',
              fontSize: '13px',
              color: '#666',
            }}>
              <p>
                <strong>Тестовые учетные данные:</strong><br />
                Email: admin@zoo.com<br />
                Пароль: password123
              </p>
            </div>

            {/* ССЫЛКА ВЕРНУТЬСЯ */}
            <ul className="actions" style={{ marginTop: '20px' }}>
              <li>
                <a href="/" className="button" style={{ background: '#ddd', color: '#333' }}>
                  ← Вернуться на главную
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}