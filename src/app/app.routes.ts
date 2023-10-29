import { Routes } from '@angular/router';
import { demonGuard } from './guard/authGuard';




export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)

  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage),
   canActivate:[demonGuard]
   

  },
  {
    path: 'docente',
    loadComponent: () => import('./docente/docente.page').then( m => m.DocentePage),
    canActivate:[demonGuard]
    
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage)
  },


];
