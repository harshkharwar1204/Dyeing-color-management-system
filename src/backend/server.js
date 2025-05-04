const express = require('express');
const cors = require('cors');
const colorCodeRoutes = require('./routes/colorCodes');
const fundamentalColorRoutes = require('./routes/fundamentalColors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(process.cwd(), 'src', 'frontend', 'public')));

// API Routes
app.use('/api/color-codes', colorCodeRoutes);
app.use('/api/fundamental-colors', fundamentalColorRoutes);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src', 'frontend', 'pages', 'index.html'));
});

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});