import { NgModule } from '@angular/core';
import { BrowserModule , provideClientHydration } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CartComponent } from './Component/Cart/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContentComponent } from './Component/content/content.component';
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
    CartComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [ {provide:  HTTP_INTERCEPTORS , useClass: AuthInterceptorService , multi: true}, provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
