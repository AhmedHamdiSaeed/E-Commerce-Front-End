import { NgModule } from '@angular/core';
import { BrowserModule , provideClientHydration } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { HomeComponent } from './Component/home/home.component';
import { HeaderComponent } from './Component/header/header.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { LoadingSpinnerComponent } from './SharedComponent/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './Services/auth/auth-interceptor.service';
import { AdminBoardComponent } from './Component/admin-board/admin-board.component';
import { ProductComponent } from './Component/product/product.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CartComponent } from './Component/Cart/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    AdminBoardComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductCategoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ {provide:  HTTP_INTERCEPTORS , useClass: AuthInterceptorService , multi: true}, provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
