import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/auth/user/user.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userLogin', component: UserComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/userLogin', pathMatch: 'full' }, // ברירת מחדל לדף הראשי
  { path: '**', redirectTo: '/userLogin' }, // כל כתובת לא ידועה מופנה ל-login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }