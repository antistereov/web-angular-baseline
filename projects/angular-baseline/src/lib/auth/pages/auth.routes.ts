import {Routes} from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@baseline/auth/pages/login/login.component').then(c => c.LoginComponent)
    }
]
