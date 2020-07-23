import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientHeaderComponent } from '../client-header/client-header.component';
import { ClientIndexComponent } from '../client-index/client-index.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ClientFooterComponent } from '../client-footer/client-footer.component';
import { ClientBlogComponent } from '../client-blog/client-blog.component';
import { ClientCategoryComponent } from '../client-category/client-category.component';
import { ClientCartComponent } from '../client-cart/client-cart.component';
import { ClientCheckoutComponent } from '../client-checkout/client-checkout.component';
import { ClientBlogDetailComponent } from '../client-blog-detail/client-blog-detail.component';
import { ClientSearchComponent } from '../client-search/client-search.component';
import { ClientLoginComponent } from '../client-login/client-login.component';
import { ClientWishlistComponent } from '../client-wishlist/client-wishlist.component';
import { ClientProductDetailComponent } from '../client-product-detail/client-product-detail.component';
import { ClientOrderHistoryComponent } from '../client-order-history/client-order-history.component';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NiceSelectModule } from "ng-nice-select";
import { ReactiveFormsModule } from '@angular/forms';
import { ClientVerifyOrderComponent } from '../client-verify-order/client-verify-order.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ClientNotFoundComponent } from '../client-not-found/client-not-found.component';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  declarations: [
    ClientComponent,
    ClientHeaderComponent,
    ClientIndexComponent,
    ClientFooterComponent,
    ClientBlogComponent,
    ClientBlogDetailComponent,
    ClientCategoryComponent,
    ClientCartComponent,
    ClientCheckoutComponent,
    ClientSearchComponent,
    ClientLoginComponent,
    ClientWishlistComponent,
    ClientProductDetailComponent,
    ClientOrderHistoryComponent,
    ClientProfileComponent,
    ClientVerifyOrderComponent,
    ClientNotFoundComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule,
    NgbModule,
    NiceSelectModule,
    ReactiveFormsModule,
    NouisliderModule,
    BarRatingModule,
  ]
})
export class ClientModule { }
