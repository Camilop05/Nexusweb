import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UsersService } from '../../core/services/users.service';
import { ROLE_LABELS, type User, type UserRole } from '../../core/models/user.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 mb-2">
        <span class="nexus-eyebrow">CONSOLA DE OPERACIONES</span>
        <h2 class="m-0 text-2xl font-semibold">Resumen de la red</h2>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-3">
        <p-card>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-surface-500 text-sm">Total registrados</span>
              <span class="text-3xl font-bold">{{ totalUsers() }}</span>
            </div>
            <i class="pi pi-users text-3xl text-primary"></i>
          </div>
        </p-card>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-3">
        <p-card>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-surface-500 text-sm">Activos</span>
              <span class="text-3xl font-bold text-green-500">{{ activeUsers() }}</span>
            </div>
            <i class="pi pi-check-circle text-3xl text-green-500"></i>
          </div>
        </p-card>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-3">
        <p-card>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-surface-500 text-sm">Inactivos</span>
              <span class="text-3xl font-bold text-red-500">{{ inactiveUsers() }}</span>
            </div>
            <i class="pi pi-ban text-3xl text-red-500"></i>
          </div>
        </p-card>
      </div>

      <div class="col-span-12 md:col-span-6 xl:col-span-3">
        <p-card>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-surface-500 text-sm">Niveles distintos</span>
              <span class="text-3xl font-bold">{{ roleBreakdown().length }}</span>
            </div>
            <i class="pi pi-shield text-3xl text-primary"></i>
          </div>
        </p-card>
      </div>

      <div class="col-span-12">
        <p-card header="Tripulación por nivel de autorización">
          @if (loading()) {
            <p class="text-surface-500">Cargando datos de la red...</p>
          } @else {
            <div class="flex flex-col gap-3">
              @for (item of roleBreakdown(); track item.role) {
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ item.label }}</span>
                  <div class="flex items-center gap-3">
                    <div class="h-2 w-40 rounded-full bg-surface-200 overflow-hidden">
                      <div
                        class="h-full bg-primary"
                        [style.width.%]="totalUsers() ? (item.count / totalUsers()) * 100 : 0"
                      ></div>
                    </div>
                    <span class="text-surface-500 text-sm w-8 text-right">{{ item.count }}</span>
                  </div>
                </div>
              }
            </div>
          }
        </p-card>
      </div>
    </div>

    <style>
      .nexus-eyebrow {
        letter-spacing: 0.15em;
        font-size: 0.7rem;
        color: var(--primary-color);
      }
    </style>
  `,
})
export class Dashboard implements OnInit {
  private readonly usersService = inject(UsersService);

  private readonly users = signal<User[]>([]);
  loading = signal(false);

  totalUsers = computed(() => this.users().length);
  activeUsers = computed(() => this.users().filter((user) => user.isActive).length);
  inactiveUsers = computed(() => this.users().filter((user) => !user.isActive).length);

  roleBreakdown = computed(() => {
    const roles = Object.keys(ROLE_LABELS) as UserRole[];

    return roles
      .map((role) => ({
        role,
        label: ROLE_LABELS[role],
        count: this.users().filter((user) => user.role === role).length,
      }))
      .filter((item) => item.count > 0 || this.users().length === 0);
  });

  ngOnInit() {
    this.loading.set(true);

    this.usersService.findMany().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}