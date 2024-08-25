const config = {
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    name: process.env.DB_NAME || "product_schema",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "shanks",
    port: process.env.DB_PORT || "3306",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  app: {
    port: process.env.port || "8000",
    clientHost: process.env.CLIENT_HOST || "http://localhost:3000",
  },
};

module.exports = config;
