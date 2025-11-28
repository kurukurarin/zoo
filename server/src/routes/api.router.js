const express = require('express');
const router = express.Router();
const formatResponse = require('../utils/formatResponse');

// Импортируем все routes
const authRouter = require('./auth.router');
const animalsRouter = require('./animal.router');
const photosRouter = require('./photoofanimal.router');
const infoAboutAnimalsRouter = require('./infoAboutAnimals.router');
const tariffsRouter = require('./tariffs.router');
const mainPageRouter = require('./mainPage.router');


 //Этот файл объединяет все маршруты приложения.
 //Использование в app.js:
 //const apiRouter = require('./routes/api.router');
// app.use('/api', apiRouter);


// АУТЕНТИФИКАЦИЯ

router.use('/auth', authRouter);

// ЖИВОТНЫЕ

router.use('/animals', animalsRouter);

// ФОТОГРАФИИ (вложены в животных: /animals/:animalId/photos)

router.use('/animals/:animalId/photos', photosRouter);

// ИНФОРМАЦИЯ О ЖИВОТНЫХ (вложена в животных: /animals/:animalId/info)

router.use('/animals/:animalId/info', infoAboutAnimalsRouter);

// ТАРИФЫ

router.use('/tariffs', tariffsRouter);

// ГЛАВНАЯ СТРАНИЦА

router.use('/main-page', mainPageRouter);

// 404 - Маршрут не найден

router.use((req, res) => {
  res.status(404).json(
    formatResponse(404, `Маршрут ${req.method} ${req.originalUrl} не найден`, null, 'NOT_FOUND')
  );
});

module.exports = router;
