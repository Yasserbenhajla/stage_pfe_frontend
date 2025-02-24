// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { AuthLoginComponent } from './demo/pages/authentication/auth-login/auth-login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthLoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
