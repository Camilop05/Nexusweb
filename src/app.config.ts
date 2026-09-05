import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),

    // HttpClient permite usar this.http.get(), this.http.post(), etc.
    // withInterceptors registra nuestro interceptor de JWT.
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),

    // Sakai 21 viene configurado para Angular zoneless. Conserva esta línea si ya existe.
    provideZonelessChangeDetection(),

    // Configuración visual de PrimeNG/Sakai.
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};