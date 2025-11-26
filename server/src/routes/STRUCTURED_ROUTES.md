#  СТРУКТУРИРОВАННЫЕ ROUTES

###  **api.router.js** - Главный файл

```javascript
// api.router.js объединяет все роутеры:
router.use('/auth', authRouter);
router.use('/animals', animalsRouter);
router.use('/animals/:animalId/photos', photosRouter);
router.use('/animals/:animalId/info', infoAboutAnimalsRouter);
router.use('/tariffs', tariffsRouter);
router.use('/main-page', mainPageRouter);
```

###  **app.js** - Использование:

```javascript
const apiRouter = require('./routes/api.router');

app.use('/api', apiRouter);
```

###  **Результат:**

```
GET  /api/auth/login
GET  /api/animals
GET  /api/animals/:id
GET  /api/animals/:animalId/photos
POST /api/animals/:animalId/photos
GET  /api/tariffs
PUT  /api/main-page
и т.д.
```

---

##  КАЖДЫЙ ROUTER:

### auth.router.js
```javascript
router.post('/login', ...)          → POST /api/auth/login
router.post('/refresh', ...)        → POST /api/auth/refresh
router.post('/logout', ...)         → POST /api/auth/logout
router.get('/me', ...)              → GET /api/auth/me
```

### animals.router.js
```javascript
router.get('/', ...)                → GET /api/animals
router.get('/:id', ...)             → GET /api/animals/1
router.post('/', ...)               → POST /api/animals
router.put('/:id', ...)             → PUT /api/animals/1
router.delete('/:id', ...)          → DELETE /api/animals/1
```

### photos.router.js (вложен)
```javascript
// Используется: router.use('/animals/:animalId/photos', photosRouter)
router.get('/', ...)                → GET /api/animals/1/photos
router.post('/', ...)               → POST /api/animals/1/photos
router.put('/:photoId', ...)        → PUT /api/animals/1/photos/5
router.delete('/:photoId', ...)     → DELETE /api/animals/1/photos/5
```

### infoAboutAnimals.router.js (вложен)
```javascript
// Используется: router.use('/animals/:animalId/info', infoAboutAnimalsRouter)
router.get('/', ...)                → GET /api/animals/1/info
router.post('/', ...)               → POST /api/animals/1/info
router.put('/:infoId', ...)         → PUT /api/animals/1/info/3
router.delete('/:infoId', ...)      → DELETE /api/animals/1/info/3
```

### tariffs.router.js
```javascript
router.get('/', ...)                → GET /api/tariffs
router.put('/', ...)                → PUT /api/tariffs
router.get('/info/last-updated',..)→ GET /api/tariffs/info/last-updated
```

### mainPage.router.js
```javascript
router.get('/', ...)                → GET /api/main-page
router.put('/', ...)                → PUT /api/main-page
router.get('/info/last-updated',..)→ GET /api/main-page/info/last-updated
```

---

## app.js ПРИМЕР:

```javascript
'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Импортируем API routes (ВСЕ в одном файле!)
const apiRouter = require('./routes/api.router');
const { errorHandler } = require('./middleware/authMiddleware');

// ═════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═════════════════════════════════════════════════════════════════

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// Логирование
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ═════════════════════════════════════════════════════════════════
// ROUTES
// ═════════════════════════════════════════════════════════════════

// Все API маршруты (одна строка!)
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

// ═════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═════════════════════════════════════════════════════════════════

app.use(errorHandler);

module.exports = app;
```

---


## В app.js:

```javascript
// Вместо этого:
// const authRouter = require('./routes/auth.router');
// const animalRouter = require('./routes/animals.router');
// app.use('/api/auth', authRouter);
// app.use('/api/animals', animalRouter);
// ...

// (одна строка!):
const apiRouter = require('./routes/api.router');
app.use('/api', apiRouter);
```