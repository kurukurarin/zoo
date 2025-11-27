const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// ═════════════════════════════════════════════════════════════════
// ИМПОРТЫ
// ═════════════════════════════════════════════════════════════════

//API роутер
const apiRouter = require('./routes/api.router');

// БД модели (ДОБАВИЛИ!)
const db = require('./db/models');

// ═════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═════════════════════════════════════════════════════════════════

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  credentials: true 
}));
app.use(cookieParser());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ═════════════════════════════════════════════════════════════════
// DATABASE SYNC
// ═════════════════════════════════════════════════════════════════

//Синхронизация с БД
 //Запускается при старте сервера

const syncDatabase = async () => {
  try {
    // Проверяем соединение с БД
    await db.sequelize.authenticate();
    console.log('✅ Соединение с БД успешно установлено');

    // Синхронизируем модели с БД
    await db.sequelize.sync({ alter: false });
    console.log('✅ БД синхронизирована с моделями');
  } catch (error) {
    console.error('❌ Ошибка синхронизации БД:', error.message);
    process.exit(1); // Завершаем процесс при ошибке
  }
};

// Вызываем синхронизацию при старте сервера
syncDatabase();

// ═════════════════════════════════════════════════════════════════
// ROUTES
// ═════════════════════════════════════════════════════════════════

// ✅ API маршруты
app.use('/api', apiRouter);

// Health check - проверка что сервер работает
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Сервер работает нормально',
    timestamp: new Date().toISOString()
  });
});

// ═════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═════════════════════════════════════════════════════════════════


// Если нужен глобальный errorHandler, то создать отдельный файл:
// middleware/errorHandler.js и импортировать отсюда

module.exports = app;