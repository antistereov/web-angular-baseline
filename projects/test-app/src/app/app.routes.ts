import { Routes } from '@angular/router';
import {authRoutes} from '@baseline/auth/page/auth.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes
    },
    {
        path: '',
        loadComponent: () => import ('@baseline/demo/pages/demo.component').then(c => c.DemoComponent)
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
