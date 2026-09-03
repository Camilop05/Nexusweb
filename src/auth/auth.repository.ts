import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Guarda el hash del refresh token, no el token original.
  createRefreshToken(data: {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return this.prisma.refreshToken.create({ data });
  }

  // Busca un refresh token por id e incluye su usuario para poder emitir nuevos tokens.
  findRefreshTokenById(id: string) {
    return this.prisma.refreshToken.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  // Revoca un token específico (se usa durante refresh, para rotar el token).
  revokeRefreshToken(id: string) {
    return this.prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  // Revoca todos los tokens activos de un usuario (útil para logout).
  revokeActiveTokensByUser(userId: string) {
    return this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      data: { revokedAt: new Date() },
    });
  }
}