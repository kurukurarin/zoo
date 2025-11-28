import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimalApi, TariffApi, MainPageApi } from '../../api';

export default function HomePage() {
  const [animals, setAnimals] = useState([]);
  const [tariffs, setTariffs] = useState(null);
  const [mainPageInfo, setMainPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Начинаем загрузку данных...');

        setLoading(true);
        
        // Загружаем животных
        const animalsData = await AnimalApi.getAll();
		console.log('✅ Животные загружены:', animalsData);

        setAnimals(animalsData.slice(0, 6)); // Первые 6 для главной
        
        // // Загружаем тарифы
        // const tariffsData = await TariffApi.get();
        // setTariffs(tariffsData);
        
        // Загружаем информацию главной страницы
        const mainPageData = await MainPageApi.get();
        setMainPageInfo(mainPageData);
        
      } catch (err) {
		console.error('❌ Ошибка:', err);
        setError(err.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

   console.log('📊 Состояние:', { animals, loading, error });

  if (loading) {
    return (
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <h2>⏳ Загрузка данных...</h2>
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

  return (
    <>
      <div id="page-wrapper">
        <div className="wrapper">
          <div className="container" id="main">
            <article id="content">
              <header>
                <h2>Урюпинский Зоопарк – Оазис живой природы</h2>
              </header>
              <a href="#" className="image featured">
                <img src="images/pic06.jpg" alt="" />
              </a>
              <div>{mainPageInfo.info}</div>
              <div>{mainPageInfo.contacts}</div>
            </article>

            {/* ЖИВОТНЫЕ */}
            <div className="row features">
              <h3 style={{ width: '100%', marginTop: '2em' }}>Наши питомцы</h3>
              {animals.map((animal) => (
                <section key={animal.id} className="col-4 col-12-narrower feature">
                  <div className="image-wrapper">
                    <a href={`/animals/${animal.id}`} className="image featured">
                      <img src='https://i.pinimg.com/736x/62/0b/01/620b01827c2678c4cc3876afaa0d7b59.jpg' alt={animal.name} />
                    </a>
                  </div>
                  <header>
                    <h3>{animal.name}</h3>
                  </header>
                  <p>{animal.feature}</p>
                  <ul className="actions">
                    <li>
                      <Link to={`/animals/${animal.id}`} className="button">
                        Подробнее
                      </Link>
                    </li>
                  </ul>
                </section>
              ))}
            </div>

            {/* БЫСТРЫЕ ССЫЛКИ */}
            <div className="row features" style={{ marginTop: '3em' }}>
              <section className="col-4 col-12-narrower feature">
                <div className="image-wrapper first">
                  <a href="#" className="image featured">
                    <img src="images/pic03.jpg" alt="" />
                  </a>
                </div>
                <header>
                  <h3>Познакомьтесь с жителями</h3>
                </header>
                <p>Узнайте больше о наших удивительных питомцах: от амурских тигров до забавных сурикатов.</p>
                <ul className="actions">
                  <li>
                    <Link to="/animals" className="button">
                      Наши обитатели
                    </Link>
                  </li>
                </ul>
              </section>
              <section className="col-4 col-12-narrower feature">
                <div className="image-wrapper">
                  <a href="#" className="image featured">
                    <img src="images/pic05.jpg" alt="" />
                  </a>
                </div>
                <header>
                  <h3>Планируйте ваш визит</h3>
                </header>
                <p>Изучите доступные билеты и удобные абонементы. Найдите подходящий вариант для вашей семьи!</p>
                <ul className="actions">
                  <li>
                    <Link to="/tariffs" className="button">
                      Тарифы и билеты
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div id="footer-wrapper">
          <div id="footer" className="container">
            <header className="major">
              <h2>Есть вопросы или идеи? Мы всегда на связи!</h2>
              <p>
                Поделитесь своими впечатлениями, задайте вопрос или предложите идею для нашего зоопарка! 
                Мы внимательно читаем каждое сообщение и рады вашему участию.
              </p>
            </header>
            <div className="row">
              <section className="col-6 col-12-narrower">
                <form method="post" action="#">
                  <div className="row gtr-50">
                    <div className="col-6 col-12-mobile">
                      <input name="name" placeholder="Имя" type="text" />
                    </div>
                    <div className="col-6 col-12-mobile">
                      <input name="email" placeholder="Email" type="text" />
                    </div>
                    <div className="col-12">
                      <textarea name="message" placeholder="Сообщение"></textarea>
                    </div>
                    <div className="col-12">
                      <ul className="actions">
                        <li>
                          <input type="submit" value="Отправить" />
                        </li>
                        <li>
                          <input type="reset" value="Очистить" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </section>
              <section className="col-6 col-12-narrower">
                <div className="row gtr-0">
                  <ul className="divided icons col-6 col-12-mobile">
                    <li className="icon brands fa-youtube">
                      <a href="#">
                        <span className="extra">YouTube-канал</span>
                      </a>
                    </li>
                  </ul>
                  <ul className="divided icons col-6 col-12-mobile">
                    <li className="icon brands fa-instagram">
                      <a href="#">
                        <span className="extra">instagram блог</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
          <div id="copyright" className="container">
            <ul className="menu">
              <li>&copy; Elbrus Bootcamp.</li>
              <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}