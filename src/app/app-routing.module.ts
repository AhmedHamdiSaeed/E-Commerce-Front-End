import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { ProductComponent } from './Component/admin-dashboard/product/product.component';
import { ProductDetailsComponent } from './Component/Admin/product-details/product-details.component';
import { CartComponent } from './Component/Cart/cart/cart.component';
import { HeaderComponent } from './Component/header/header.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { AdminBoardComponent } from './Component/admin-dashboard/admin-board/admin-board.component';
import { AuthGuardService } from './Services/auth/auth-guard.service';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { AddProductComponent } from './Component/Admin/add-product/add-product.component';
import { AddCategoryComponent } from './Component/Admin/add-category/add-category.component';
import { EditProductComponent } from './Component/Admin/edit-product/edit-product.component';
import { PaymentSuccessComponent } from './Component/payment-success/payment-success.component';
import { ContentComponent } from './Component/admin-dashboard/Orders/content.component';
import { AdminUsersComponent } from './Component/admin-users/admin-users.component';

const routes: Routes = [
  {path:'paymentSuccess/:id',component:PaymentSuccessComponent, canActivate: [AuthGuardService]},
  { path: 'Profile', component: UserProfileComponent , canActivate: [AuthGuardService]},

  { path: 'home', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/category', component: CategoriesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'Admin',
    component: AdminBoardComponent,
    canActivate: [AuthGuardService],
    children:[
      { path: 'AddCategory',
      component: AddCategoryComponent ,
      canActivate: [AuthGuardService]
       },
      {
        path: 'Products',
        component: ProductComponent,
        canActivate: [AuthGuardService]
      },
      { path: 'AddProduct',
       component: AddProductComponent,
        canActivate: [AuthGuardService]
       },
       { path: 'EditProduct/:id',
       component: EditProductComponent,
        canActivate: [AuthGuardService]
       },
       {
        path: 'Orders',
        component: ContentComponent,
        canActivate: [AuthGuardService]
       },
       {
        path: 'Users',
        component: AdminUsersComponent,
        canActivate: [AuthGuardService]
       },
    ]
  },
 


  { path: 'Profile', component: UserProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'Not-Found', component: NotFoundComponent },
  { path: '**', redirectTo: 'Not-Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
