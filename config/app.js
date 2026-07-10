function parseListen() {
  const listen = process.env.X_LISTEN || process.env.PORT || '8007';
  if (listen.includes(':')) {
    const [host, port] = listen.split(':');
    return { host, port: parseInt(port, 10) };
  }
  return {
    host: process.env.APP_HOST || '127.0.0.1',
    port: parseInt(listen, 10),
  };
}

const { host, port } = parseListen();

module.exports = {
  host,
  port,
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
};
