import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env


const sequelizeOptions = {
  host: 'dumbo.db.elephantsql.com',
//   port: Number(PG_PORT),
  username: 'crjgpwuy',
  password: 'MTHE3SxTiFPLwX84ZDLLpWnlsV-yMztc',
  database: 'crjgpwuy',
  dialect: 'postgres',
  
//   models: [path.join(__dirname, '/models')],
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


