const routes = require('./routes/routes');
const { errorHandler } = require('./middleware/authMiddleware');

app.use('/api', routes);
app.use(errorHandler);