import postgres from 'postgres';

const POSTGRES_SSL = (process.env.POSTGRES_SSL) ? ( ( process.env.POSTGRES_SSL == 'true' ) ? true : false) : false;
const POSTGRES_PORT = (process.env.POSTGRES_PORT) ? process.env.POSTGRES_PORT : '5432';

const sql = (process.env.POSTGRES_URL) ? postgres(process.env.POSTGRES_URL!, { ssl: 'require' }) : postgres({
      host: process.env.POSTGRES_HOST, 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD, 
      database: process.env.POSTGRES_DATABASE,
      port: parseInt(POSTGRES_PORT),
      ssl: POSTGRES_SSL
    });



async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;


}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProducts(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
