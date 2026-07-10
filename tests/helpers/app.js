const { createApp } = require('../../bootstrap/app');
const { migrate, resetTables, closeDb } = require('../../app/Support/db');

function createTestServer() {
  migrate();
  const app = createApp();

  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const baseUrl = `http://127.0.0.1:${port}`;

      resolve({
        baseUrl,
        app,
        close: () => new Promise((res, rej) => {
          server.close((err) => {
            closeDb();
            if (err) rej(err);
            else res();
          });
        }),
        resetTables: () => resetTables(),
      });
    });
  });
}

module.exports = { createTestServer };
