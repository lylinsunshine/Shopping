import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientIndexComponent } from '../client-index/client-index.component';
import { ClientCategoryComponent } from '../client-category/client-category.component';
import { ClientProductDetailComponent } from '../client-product-detail/client-product-detail.component';
import { ClientBlogComponent } from '../client-blog/client-blog.component';
import { ClientBlogDetailComponent } from '../client-blog-detail/client-blog-detail.component';
import { ClientCartComponent } from '../client-cart/client-cart.component';
import { ClientCheckoutComponent } from '../client-checkout/client-checkout.component';
import { ClientWishlistComponent } from '../client-wishlist/client-wishlist.component';
import { ClientOrderHistoryComponent } from '../client-order-history/client-order-history.component';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { ClientLoginComponent } from '../client-login/client-login.component';
import { ClientVerifyOrderComponent } from '../client-verify-order/client-verify-order.component';
import { ClientNotFoundComponent } from '../client-not-found/client-not-found.component';


const routes: Routes = [
  {
    path: 'client', component: ClientComponent,
    children : [
      {
        path: 'index', component: ClientIndexComponent,
      },
      {
        path: 'category/:url', component: ClientCategoryComponent,
      },
      {
        path: 'product/:url', component: ClientProductDetailComponent,
      },
      {
        path: 'blog', component: ClientBlogComponent,
      },
      {
        path: 'blog-detail', component: ClientBlogDetailComponent,
      },
      {
        path: 'cart', component: ClientCartComponent,
      },
      {
        path: 'checkout', component: ClientCheckoutComponent,
      },
      {
        path: 'wishlist', component: ClientWishlistComponent,
      },
      {
        path: 'order-history', component: ClientOrderHistoryComponent,
      },
      {
        path: 'profile', component: ClientProfileComponent,
      },
      {
        path: 'login', component: ClientLoginComponent,
      },
      {
        path: 'verify', component: ClientVerifyOrderComponent,
      },
      {
        path: '**', component: ClientNotFoundComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
