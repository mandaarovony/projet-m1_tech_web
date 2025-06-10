const { Client } = require('pg');

const DB_NAME = 'ecommerce';

async function createDatabaseIfNotExists() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'alexa',
    port: 5432,
    database: 'postgres', 
  });

  try {
    await client.connect();

    // Vérifie si  base existe
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`✅ Base de données '${DB_NAME}' créé.`);
    } else {
      console.log(`ℹ️ La base '${DB_NAME}' existe .`);
    }

  } catch (err) {
    console.error('Erreur lors de la vérification/création de la base :', err);
  } finally {
    await client.end();
  }
}

module.exports = createDatabaseIfNotExists;
