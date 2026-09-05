export type UserRole = 'ADMIN' | 'USER' | 'SUPERVISOR';

// Usuario público que devuelve el backend.
// No contiene passwordHash porque ese dato no debe llegar al frontend.
export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Datos para crear usuarios desde Angular.
export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
};

// Datos para actualizar usuarios.
export type UpdateUserRequest = {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
};

// Mapeo visual de roles técnicos a nombres temáticos de Nexus.
// El backend y la base de datos siguen usando ADMIN/USER/SUPERVISOR.
export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Comandante',
  SUPERVISOR: 'Oficial de turno',
  USER: 'Tripulante',
};