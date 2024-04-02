import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { ProductComponent } from './Component/admin-dashboard/product/product.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { CartComponent } from './Component/Cart/cart/cart.component';
import { HeaderComponent } from './Component/header/header.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { AdminBoardComponent } from './Component/admin-dashboard/admin-board/admin-board.component';
import { AuthGuardService } from './Services/auth/auth-guard.service';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { AddCategoryComponent } from './Component/add-category/add-category.component';
import { EditProductComponent } from './Component/edit-product/edit-product.component';
import { PaymentSuccessComponent } from './Component/payment-success/payment-success.component';

const routes: Routes = [
  {path:'paymentSuccess/:id',component:PaymentSuccessComponent, canActivate: [AuthGuardService]},
  { path: 'Profile', component: UserProfileComponent , canActivate: [AuthGuardService]},

  { path: 'home', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/category', component: CategoriesComponent },
  { path: 'Add_Category', component: AddCategoryComponent },

  { path: 'about-us', component: AboutUsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductDetailsComponent },

  {
    path: 'Admin',
    component: AdminBoardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'Admin/Products',
    component: ProductComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'Admin/AddProduct',
   component: AddProductComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'Admin/EditProduct/:id',
   component: EditProductComponent,
    canActivate: [AuthGuardService]
   },


  { path: 'Profile', component: UserProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'Not-Found', component: NotFoundComponent },
  { path: 'Profile', component: UserProfileComponent },
  { path: '**', redirectTo: 'Not-Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
