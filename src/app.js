const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/user', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/daily', require('./routes/daily'));
app.use('/api/games', require('./routes/games'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/admin', require('./routes/admin'));


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер іске қосылды: http://localhost:${PORT}`));