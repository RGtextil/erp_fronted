import { Routes } from '@angular/router';
import { Register } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Login } from './pages/login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

];
