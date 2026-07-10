const path = require('path');

process.env.DB_DATABASE = path.join(process.cwd(), 'database', 'test.sqlite');
