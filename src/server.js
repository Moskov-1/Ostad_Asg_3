const express = require('express');
const path = require('path');
const fileURLToPath = require('url');
// import path from 'path';
// import { fileURLToPath } from 'url';

// __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

let server;

// if (import.meta.url === new URL(import.meta.resolve('./server.js')).href) {
//   server = app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

if (require.main === module) {
  // If the file is run directly, start the server
  const PORT = process.env.PORT || 3000;

  server = app.listen(PORT, () => {
    console.log(`✓ Server successfully started on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Server is ready to accept connections`);
  });

  // Error handling for server startup
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`✗ Error: Port ${PORT} is already in use`);
      process.exit(1);
    } else if (error.code === 'EACCES') {
      console.error(`✗ Error: Permission denied to bind to port ${PORT}`);
      process.exit(1);
    } else {
      console.error('✗ Server error:', error);
      process.exit(1);
    }
  });

  // Graceful shutdown for PM2
  process.on('SIGINT', () => {
    console.log('\n✓ Received SIGINT, gracefully shutting down...');
    server.close(() => {
      console.log('✓ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('\n✓ Received SIGTERM, gracefully shutting down...');
    server.close(() => {
      console.log('✓ Server closed');
      process.exit(0);
    });
  });
}

module.exports = app