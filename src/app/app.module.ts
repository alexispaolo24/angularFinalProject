import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { AcknowledgementComponent } from './modules/acknowledgement/acknowledgement.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './modules/cart/cart.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { PendingOrdersComponent } from './modules/pending-orders/pending-orders.component';
import { ProductsComponent } from './modules/products/products.component';
import { AdminComponent } from './modules/admin/admin.component';
import { SignupComponent } from './modules/signup/signup.component';
import { HeaderComponent } from './shared/header/header.component';
import { EditComponent } from './modules/edit/edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { EditProductComponent } from './modules/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ForgotPasswordComponent,
    AcknowledgementComponent,
    DashboardComponent,
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    PendingOrdersComponent,
    ProductsComponent,
    AdminComponent,
    SignupComponent,
    HeaderComponent,
    EditComponent,
    AddProductComponent,
    EditProductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
