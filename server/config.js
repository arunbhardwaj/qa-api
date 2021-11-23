module.exports = {
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_IP: process.env.POSTGRES_IP || 'db',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432'
}