import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // Entorno actual de la aplicación. Puedes agregar otros entornos si tu equipo los usa.
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'staging', 'production')
    .default('development'),

  // Puerto donde levantará NestJS. Si no se define en .env, usará 3000.
  PORT: Joi.number().port().default(3000),

  // URL pública/base de la aplicación. En local normalmente será http://localhost:3000.
  APP_URL: Joi.string().uri().required(),

  // Conexión completa a PostgreSQL. Si está mal escrita, Prisma no podrá conectarse.
  DATABASE_URL: Joi.string().uri({ scheme: ['postgresql', 'postgres'] }).required(),

  // Secretos para firmar tokens. Deben ser largos y diferentes entre sí.
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),

  // Tiempos de vida de los tokens. Puedes cambiarlos según la necesidad del sistema.
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Costo de bcrypt. Mientras más alto, más seguro, pero también más lento.
  BCRYPT_SALT_ROUNDS: Joi.number().integer().min(10).max(15).default(12),
});