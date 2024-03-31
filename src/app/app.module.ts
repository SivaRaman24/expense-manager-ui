import { DEFAULT_CURRENCY_CODE, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CoreModule } from './core/core.module';
import { ExceptionService } from './core/services/ExceptionService';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ExceptionService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
