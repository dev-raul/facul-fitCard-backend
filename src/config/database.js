require("dotenv/config");
if (process.env.NODE_ENV === 'DEV') {
  module.exports = {
    dialect: "postgres",
    host: process.env.DB_HOST_DEV,
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
} else {
  module.exports = {
    dialect: "postgres",
    url: process.env.DB_URL,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
}
