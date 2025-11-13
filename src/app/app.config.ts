import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ErrorInterceptor } from './services/error.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { tokenInterceptor } from './services/token.intercepor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
      provideRouter(routes),
        provideHttpClient(withInterceptors([tokenInterceptor])),

        ErrorInterceptor
  ],
};
