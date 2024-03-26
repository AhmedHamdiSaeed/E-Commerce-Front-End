import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { CartComponent } from './Component/Cart/cart/cart.component';
import { AdminBoardComponent } from './Component/admin-board/admin-board.component';
import {AuthGuardService} from './Services/auth/auth-guard.service'
import { AboutUsComponent } from './Component/about-us/about-us.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/category', component: CategoriesComponent },
  { path: 'about-us', component: AboutUsComponent },
   { path: 'Admin/products', component: ProductComponent ,canActivate: [AuthGuardService] },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'Not-Found', component: NotFoundComponent },
  { path: '**', redirectTo: 'Not-Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
