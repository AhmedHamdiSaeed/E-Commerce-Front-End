import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
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
import { AdminBoardComponent } from './Component/admin-dashboard/admin-board/admin-board.component';
import { ProductComponent } from './Component/admin-dashboard/product/product.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { CartComponent } from './Component/Cart/cart/cart.component';
import { ContentComponent } from './Component/admin-dashboard/Orders/content.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { EditProductDialogComponent } from './Component/edit-product-dialog/edit-product-dialog.component';
import { SearchComponent } from './Component/search/search.component';
import { AddProductComponent } from './Component/add-product/add-product.component';

import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './component/footer/footer.component';

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
    ContentComponent,
    AboutUsComponent,
    EditProductDialogComponent,
    ContentComponent,
    SearchComponent,
    AddProductComponent,
    FooterComponent,
  ],
  imports: [
    CarouselModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideClientHydration(),
  ],
  bootstrap: [
    AppComponent,
    MatTableModule,
    MatInputModule,
    MatDialogModule, // Include MatDialogModule here
    AppRoutingModule,
  ],
})
export class AppModule {}
