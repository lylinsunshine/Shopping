import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwaggerComponent } from './component/swagger/swagger.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './page/main-layout/main-layout.component';
import { ClientIndexComponent } from './client-component/client-index/client-index.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin/index', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'swagger', component: SwaggerComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
