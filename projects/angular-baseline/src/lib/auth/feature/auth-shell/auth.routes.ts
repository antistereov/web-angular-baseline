import {Routes} from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@baseline-int/auth/feature/login/login.component').then(c => c.LoginComponent)
    }
]
