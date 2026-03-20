require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origen no permitido → ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conect to DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Servdor en puerto ${PORT} 🚀`));