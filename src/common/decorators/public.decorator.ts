import { SetMetadata } from '@nestjs/common';

// Llave interna que usará JwtAuthGuard para buscar la metadata.
export const IS_PUBLIC_KEY = 'isPublic';

// Decorador para marcar endpoints que no requieren access token.
// Ejemplo: @Public() en login, register y refresh.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);