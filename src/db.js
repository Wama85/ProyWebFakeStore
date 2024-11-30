import {createPool} from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "5951561010",
  database: "bd_store",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
