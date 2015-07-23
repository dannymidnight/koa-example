import knex from 'knex';
import bookshelf from 'bookshelf';

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const Bookshelf = bookshelf(db);
const Model = Bookshelf.Model;

export { Bookshelf, Model };

export default db;
