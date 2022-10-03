import mysql from "mysql"

import dotenv from "dotenv";

dotenv.config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

//DB connection error query: 
//"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'"";
//"FLUSH PRIVILEGES;""
export const db = mysql.createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
 })