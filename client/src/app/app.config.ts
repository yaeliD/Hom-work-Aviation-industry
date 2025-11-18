import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [AuthService, provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule, ReactiveFormsModule),
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi())]
};

// bootstrapApplication(AppComponent, {
//   providers: [
//     AuthService,
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//     provideHttpClient(withInterceptorsFromDi()) // ⚡ חובה כדי שה־HttpClient יראה את ה־interceptor
//   ]
// });

