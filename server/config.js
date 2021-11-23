module.exports = {
  POSTGRES_USER: process.env.PGUSER || 'postgres',
  POSTGRES_PASSWORD: process.env.PGPASSWORD || 'postgres',
  POSTGRES_HOST: process.env.PGHOST || 'localhost',
  POSTGRES_DB: process.env.PGDATABASE || 'postgres',
  POSTGRES_PORT: process.env.PGPORT || '5432'
}