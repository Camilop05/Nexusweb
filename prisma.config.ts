import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  // Ruta del schema principal de Prisma.
  schema: 'prisma/schema.prisma',

  // Prisma guardará aquí las migraciones y sabrá cómo ejecutar el seed.
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },

  // DATABASE_URL viene del archivo .env.
  datasource: {
    url: env('DATABASE_URL'),
  },
});