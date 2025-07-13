
import postgres from 'postgres';

import {
    Product
} from './definitions';

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


export async function fetchProducts() {
  try {

    const data = await sql<Product[]>`SELECT * FROM products`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await sql<Product[]>`
      SELECT
        *
      FROM products
      WHERE products.id = ${id};
    `;

    return data[0];
  } catch (error) {
    return false;
  }
}