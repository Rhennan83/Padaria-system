import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",   // ou "dev-postgres" se rodar no Docker
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "padaria_system"
});

export default pool;

