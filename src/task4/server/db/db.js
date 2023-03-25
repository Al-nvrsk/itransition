import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config()
dotenv.config({ path: path.join(__dirname,'..', '..', '..','..', '.env') });
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

const sequelizeOptions = {
  host: PGHOST,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export const postgresConnect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('\x1b[32m', `✨Connection to DB has been established successfully✨`, '\x1b[0m');
  } catch (error) {
    console.error('Unable sequelize to connect to the database:', error);
  }
}


