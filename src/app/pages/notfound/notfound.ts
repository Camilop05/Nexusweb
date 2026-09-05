import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    template: ` <app-floating-configurator />
        <div class="flex items-center justify-center min-h-screen overflow-hidden nexus-notfound">
            <div class="flex flex-col items-center justify-center text-center px-4">
                <span class="text-primary font-bold text-3xl mb-2">404</span>
                <h1 class="text-surface-0 font-bold text-3xl lg:text-5xl mb-4">Recurso no encontrado</h1>
                <p class="text-surface-300 mb-8 max-w-md">
                    La ruta que intentas acceder no existe o no está disponible en la red Nexus.
                </p>
                <p-button label="Volver al panel de control" icon="pi pi-home" routerLink="/" />
            </div>
        </div>

        <style>
            .nexus-notfound {
                background: radial-gradient(circle at top, #0b1a2b 0%, #05080f 70%);
            }
        </style>`
})
export class Notfound {}