import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { ProductsComponent } from './paginas/productos/products.component';
import { HomeComponent } from './paginas/home/home.component';
import { AdminProductosComponent } from './paginas/admin-productos/admin-productos.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'administrador', component: AdminProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
