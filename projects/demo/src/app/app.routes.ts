import {Routes} from '@angular/router';
import {authRoutes} from '@baseline/auth/page/auth.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes
    },
    {
        path: '',
        loadComponent: () => import ('./demo/page/demo.component').then(c => c.DemoComponent)
    },
    {
        path: 'me',
        loadComponent: () => import('./me/page/me.component').then(c => c.MeComponent)
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
