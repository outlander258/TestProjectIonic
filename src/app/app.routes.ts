import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage)
  },
  {
    path: 'docente',
    loadComponent: () => import('./docente/docente.page').then( m => m.DocentePage)
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage)
  },


];
