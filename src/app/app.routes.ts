import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: 'calendar',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/calendar/calendar.component').then(c => c.CalendarComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
