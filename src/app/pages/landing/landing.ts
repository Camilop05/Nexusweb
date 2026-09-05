import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  template: `
    <div class="nexus-landing flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span class="nexus-badge mb-4">SISTEMA DE ACCESO</span>

      <h1 class="nexus-title mb-4 text-5xl font-bold">NEXUS</h1>

      <p class="mb-8 max-w-xl text-lg text-surface-300">
        Red de control de acceso y gestión de credenciales para tripulación autorizada.
        Verifica tu identidad para ingresar a la consola de operaciones.
      </p>

      <div class="flex gap-4">
        <a routerLink="/auth/login">
          <button pButton label="Iniciar sesión" icon="pi pi-sign-in"></button>
        </a>
        <a routerLink="/auth/register">
          <button pButton label="Solicitar credenciales" icon="pi pi-user-plus" severity="secondary"></button>
        </a>
      </div>
    </div>

    <style>
      .nexus-landing {
        background: radial-gradient(circle at top, #0b1a2b 0%, #05080f 70%);
        color: #e5f3ff;
      }

      .nexus-badge {
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        color: #38bdf8;
        border: 1px solid #38bdf8;
        border-radius: 999px;
        padding: 0.25rem 1rem;
      }

      .nexus-title {
        letter-spacing: 0.1em;
        color: #67e8f9;
        text-shadow: 0 0 20px rgba(103, 232, 249, 0.5);
      }
    </style>
  `,
})
export class Landing {}