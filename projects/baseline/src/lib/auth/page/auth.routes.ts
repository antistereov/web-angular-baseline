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
        path: '2fa/verify',
        loadComponent: () => import('@baseline/auth/page/two-factor-verify/two-factor-verify.component').then(c => c.TwoFactorVerifyComponent)
    },
    {
        path: '2fa/setup',
        loadComponent: () => import('@baseline/auth/page/two-factor-setup/two-factor-setup.component').then(c => c.TwoFactorSetupComponent)
    },
    {
        path: '2fa/recovery',
        loadComponent: () => import('@baseline/auth/page/two-factor-recovery/two-factor-recovery.component').then(c => c.TwoFactorRecoveryComponent)
    }
]
