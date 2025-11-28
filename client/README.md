# Ожидаемая структура src файла

```bash
src/
├── app/                   # Настройка приложения
│   └── App.jsx            # Главный компонент с роутингом
├── entities/              # Сущности из моделей
│   └── api/ 
├── pages/                 # Страницы
│   ├── HomePage/          # Главная страница
│   ├── AnimalsPage/       # Список животных
│   ├── AnimalDetailsPage/ # Детальная страница животного
│   ├── TariffsPage/       # Страница тарифов
│   └── admin/             # Админ-панель
├── widgets/               # Сложные компоненты
│   ├── Nav/               # Навигация
│   └── PhotoGallery/      # Галерея фотографий
├── features/              # Функциональности
│   └── animal-search/     # Поиск животных
├── shared/                # Переиспользуемый код
│   ├── api/               # API сервисы
│   ├── lib/               # Утилиты, конфиги
│   └── ui/                # Базовые UI компоненты
└── hooks/                 # Кастомные хуки
```

# Приоритетные задачи

## Задача 1: Cоздать API сущности

**Папка: src/entities/api/**

**Файлы для создания:**

- animalApi.js - для работы с животными

- tariffApi.js - для тарифов

- mainPageApi.js - для главной страницы

- authApi.js - для авторизации

- adminApi.js - для админских операций

```javascript
// src/shared/api/animalApi.js
export const animalApi = {
  getAll: () => axiosInstance.get('/api/animals'),
  getById: (id) => axiosInstance.get(`/api/animals/${id}`),
  // ... остальные методы
}
```

## Задача 2: Настроить все маршруты в App.jsx

**Файл: src/app/App.jsx**

```javascript
// Добавить роуты для: /animals, /animals/:id, /tariffs, /admin/*
```

## Задача 3: Создать базовые компоненты

**Папки:**

- src/widgets/Nav/ - навигация

- src/shared/ui/AnimalCard/ - карточка животного

- src/widgets/PhotoGallery/ - галерея

## Задача 4: Страница животных (AnimalsPage)

**Файл: src/pages/AnimalsPage/AnimalsPage.jsx**

- Сетка карточек животных

- Загрузка данных через animalApi

## Задача 5: Детальная страница животного (AnimalDetailsPage)

**Файл: src/pages/AnimalDetailsPage/AnimalDetailsPage.jsx**

- Полная информация о животном

- Галерея фотографий

- Интересные факты

## Задача 6: Страница тарифов (TariffsPage)

- Отображение цен и условий

# Неприоритетные задачи (по мере успеваемости)

## Задача 7: Редактирование контента (для админа)

**Файлы:**

- src/pages/admin/AdminMainPage/AdminMainPage.jsx - Главная страница

- src/pages/admin/AdminTariffs/AdminTariffs.jsx - Тарифы


## Задача 8: Авторизация админа

**Файл: src/pages/admin/AdminLogin/AdminLogin.jsx**

- Страница входа (/admin/login)

- Защищённые роуты

## Задача 9: CRUD для животных в админке

**Файл: src/pages/admin/AdminAnimals/AdminAnimals.jsx**

- Создание/редактирование/удаление животных

- Загрузка фотографий