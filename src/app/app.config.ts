import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ErrorInterceptor } from './services/error.interceptor';
import { TokenInterceptor } from './services/token.intercepor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
      provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        TokenInterceptor, // necesario para DI
        ErrorInterceptor
  ],
};
