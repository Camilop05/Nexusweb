import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly config: ConfigService,
  ) {}

  findMany() {
    return this.usersRepository.findMany();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  // Usado por autenticación: devuelve passwordHash porque login necesita compararlo.
  findByEmailWithPassword(email: string) {
    return this.usersRepository.findByEmailWithPassword(email);
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmailWithPassword(dto.email);

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const passwordHash = await this.hashPassword(dto.password);

    return this.usersRepository.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
      role: dto.role,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    const passwordHash = dto.password ? await this.hashPassword(dto.password) : undefined;

    return this.usersRepository.update(id, {
      email: dto.email,
      name: dto.name,
      passwordHash,
      role: dto.role,
      isActive: dto.isActive,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.usersRepository.deactivate(id);
  }

  private hashPassword(password: string) {
    const saltRounds = this.config.getOrThrow<number>('BCRYPT_SALT_ROUNDS');
    return bcrypt.hash(password, saltRounds);
  }
}