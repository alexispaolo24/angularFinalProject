import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { AcknowledgementComponent } from './modules/acknowledgement/acknowledgement.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CartComponent } from './modules/cart/cart.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { PendingOrdersComponent } from './modules/pending-orders/pending-orders.component';
import { ProductsComponent } from './modules/products/products.component';
import { AdminComponent } from './modules/admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'acknowledgement',
    component: AcknowledgementComponent
  },
  {
    path: '**   ',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'pending-orders',
    component: PendingOrdersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
