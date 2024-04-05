import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
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
import { MatButtonModule } from '@angular/material/button';
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
import { EditProductComponent } from './Component/Admin/edit-product/edit-product.component';
import { SearchComponent } from './Component/search/search.component';
import { AddProductComponent } from './Component/Admin/add-product/add-product.component';

import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './Component/footer/footer.component';
import { ConfirmMessageComponent } from './SharedComponent/confirm-message/confirm-message.component';
import { AddCategoryComponent } from './Component/Admin/add-category/add-category.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { PaymentSuccessComponent } from './Component/payment-success/payment-success.component';
// import ngx-translate and the http loader
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductDetailsDialogComponent } from './Component/Admin/product-details-dialog/product-details-dialog.component';
import { UpdateProfileComponent } from './Component/update-profile/update-profile.component';
import { UserOrdersComponent } from './Component/user-orders/user-orders.component';
import { AdminUsersComponent } from './Component/Admin/admin-users/admin-users.component';
import { OrderDetailDialogComponent } from './Component/admin-dashboard/order-detail-dialog/order-detail-dialog.component';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    ContactUsComponent,
    AddCategoryComponent,
    ConfirmMessageComponent,
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
    EditProductComponent,
    ContentComponent,
    SearchComponent,
    AddProductComponent,
    FooterComponent,
    ProductDetailsDialogComponent,
    PaymentSuccessComponent,
    UpdateProfileComponent,
    UserOrdersComponent,
    AdminUsersComponent,
    UserProfileComponent,
    OrderDetailDialogComponent,
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
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideClientHydration(),
    provideAnimationsAsync(),
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
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
