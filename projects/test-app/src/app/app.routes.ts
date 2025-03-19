import { Routes } from '@angular/router';
import {authRoutes} from '@baseline-int/auth/feature/auth-shell/auth.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes
    }
];
