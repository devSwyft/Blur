export default () => ({
  DATABASE_HOST: process.env.DB_HOST,
  DATABASE_PORT: parseInt(process.env.DB_PORT),
  DATABASE_USERNAME: process.env.DB_USERNAME,
  DATABASE_PASSWORD: process.env.DB_PASSWORD,
  DATABASE_SCHEMA: process.env.DB_SCHEMA,
  DATABASE_SYNC: process.env.MODE === 'DEV',
  MODE: process.env.MODE,
})