# 📘 Using the Angular Baseline Library


## 📌 1. Importing Auth Routes into the Main App

The baseline library provides **authRoutes**, which you can directly integrate into your app.

### **1️⃣ Auth Routes in the Baseline Library**
The routes are defined in the library:

```typescript
// auth.routes.ts (in the library)
import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
```

### **2️⃣ Using Auth Routes in the Main Project**
Import the routes into your `app.routes.ts` in your project:

```typescript
// app.routes.ts (in the UI project)
import { Routes } from '@angular/router';
import { authRoutes } from '@my-org/angular-baseline/auth.routes';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: '**', redirectTo: 'auth/login' }
];
```

➡ This makes all authentication pages from the baseline library accessible under `/auth/...`.

---

## 📌 2. Setting and Overriding App Config
The baseline library uses an **Injection Token (`APP_CONFIG`)** to configure environment variables such as API URLs.

### **1️⃣ Config Interface & Token in the Library**

```typescript
// lib.config.ts (in the library)
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  enableLogging: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    apiBaseUrl: 'https://default-api.com', // Default value
    enableLogging: false
  })
});
```

### **2️⃣ Using the Config in a Service**

```typescript
// api.service.ts (in the library)
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private config = inject(APP_CONFIG);

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.config.apiBaseUrl}/data`);
  }
}
```

### **3️⃣ Overriding Config in the Main Project**

In the **`app.config.ts`** of the UI project, you can override the values:

```typescript
// app.config.ts (in the UI project)
import { APP_CONFIG, AppConfig } from '@my-org/angular-baseline';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://localhost:8000', enableLogging: true }}
    ]
};
```

➡ This allows each project to set its own API URL without modifying the baseline library.
