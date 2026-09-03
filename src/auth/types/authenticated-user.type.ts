export type AuthenticatedUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'SUPERVISOR';
};