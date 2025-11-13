import { Routes } from '@angular/router';
import { Register } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Login } from './pages/login/login.component';
import { LogisticaComponent } from './pages/logistica/logistica/logistica.component';
import { ProductoIngresoComponent } from './pages/logistica/producto-ingreso/producto-ingreso.component';
import { ProductoListaComponent } from './pages/logistica/producto-lista/producto-lista.component';
import { ProveedorComponent } from './pages/logistica/proveedor/proveedor.component';
import { ProductoTotales } from './pages/logistica/producto-totales/producto-totales.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'logistica', component: LogisticaComponent},
  { path: 'productoingreso', component: ProductoIngresoComponent, canActivate: [authGuard] },
  { path: 'productolista', component: ProductoListaComponent},
  { path: 'productototales', component: ProductoTotales},
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

];
