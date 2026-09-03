import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Campos públicos que se devolverán al cliente.
// Importante: passwordHash no aparece aquí, así evitamos exponerlo por accidente.
const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.user.findMany({
      select: publicUserSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });
  }

  // Este método sí trae passwordHash porque autenticación necesita comparar passwords.
  // No lo uses para responder directamente al cliente.
  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: {
    email: string;
    name: string;
    passwordHash: string;
    role?: 'ADMIN' | 'USER' | 'SUPERVISOR';
  }) {
    return this.prisma.user.create({
      data,
      select: publicUserSelect,
    });
  }

  update(
    id: string,
    data: Partial<{
      email: string;
      name: string;
      passwordHash: string;
      role: 'ADMIN' | 'USER' | 'SUPERVISOR';
      isActive: boolean;
    }>,
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: publicUserSelect,
    });
  }

  // En este tutorial no borramos físicamente el usuario, lo marcamos como inactivo.
  deactivate(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: publicUserSelect,
    });
  }
}