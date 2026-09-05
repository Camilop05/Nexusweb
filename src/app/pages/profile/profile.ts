import { Component, OnInit, inject, signal } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../core/services/auth.service';
import type { AuthenticatedUser } from '../../core/models/auth.models';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [TagModule],
  template: `
    <div class="card flex flex-col gap-4" style="max-width: 32rem">
      <h2 class="m-0 text-2xl font-semibold">Mi perfil</h2>

      @if (user()) {
        <div class="flex flex-col gap-3">
          <div>
            <span class="block text-surface-500 text-sm">Correo</span>
            <span class="font-medium">{{ user()!.email }}</span>
          </div>

          <div>
            <span class="block text-surface-500 text-sm">Rol</span>
            <p-tag [value]="user()!.role" severity="info" />
          </div>

          <div>
            <span class="block text-surface-500 text-sm">Identificador</span>
            <span class="font-mono text-sm">{{ user()!.id }}</span>
          </div>
        </div>
      } @else {
        <p class="text-surface-500">Cargando información del perfil...</p>
      }
    </div>
  `,
})
export class ProfilePage implements OnInit {
  private readonly authService = inject(AuthService);

  user = signal<AuthenticatedUser | null>(null);

  ngOnInit() {
    this.authService.me().subscribe({
      next: (user) => this.user.set(user),
    });
  }
}