import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  {path: 'home' , component:HomeComponent},
  {path: 'register' , component:SignupComponent},
  {path: 'login' ,component:LoginComponent},
  {path: 'category' , component: CategoriesComponent, canActivate:[AuthGuardService]},
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'Not-Found' , component:NotFoundComponent},
  {path: '**' , redirectTo:'Not-Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
