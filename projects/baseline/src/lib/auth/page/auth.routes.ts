import {Routes} from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@baseline/auth/page/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('@baseline/auth/page/register/register.component').then(c => c.RegisterComponent),
    },
    {
        path: 'verify-email',
        loadComponent: () => import('@baseline/auth/page/verify-email/verify-email.component').then(c => c.VerifyEmailComponent)
    },
    {
        path: '2fa/:context',
        loadComponent: () => import('@baseline/auth/page/two-factor/two-factor.component').then(c => c.TwoFactorComponent)
    }
]
