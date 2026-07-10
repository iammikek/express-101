require('dotenv').config();

const config = require('../config/app');
const { createApp } = require('../bootstrap/app');
const { migrate } = require('../app/Support/db');

migrate();

const app = createApp();

app.listen(config.port, config.host, () => {
  console.log(`[express-101] Server running at http://${config.host}:${config.port}`);
});
