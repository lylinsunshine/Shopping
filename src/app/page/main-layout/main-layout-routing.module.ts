import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowManufacturerComponent } from 'src/app/component/manufacturer/show-manufacturer/show-manufacturer.component';
import { ShowProductComponent } from 'src/app/component/product/show-product/show-product.component';
import { ShowCategoryComponent } from 'src/app/component/category/show-category/show-category.component';
import { MainLayoutComponent } from './main-layout.component';
import { AddManufacturerComponent } from 'src/app/component/manufacturer/add-manufacturer/add-manufacturer.component';
import { AddProductComponent } from 'src/app/component/product/add-product/add-product.component';
import { EditManufacturerComponent } from 'src/app/component/manufacturer/edit-manufacturer/edit-manufacturer.component';
import { EditProductComponent } from 'src/app/component/product/edit-product/edit-product.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { OrderComponent } from 'src/app/component/order/order.component';
import { ShowPromotionComponent } from 'src/app/component/promotion/show-promotion/show-promotion.component';
import { AddPromotionComponent } from 'src/app/component/promotion/add-promotion/add-promotion.component';
import { IndexComponent } from 'src/app/component/index/index.component';
import { ReviewComponent } from 'src/app/component/review/review.component';
import { ShowPostComponent } from 'src/app/component/post/show-post/show-post.component';
import { AddPostComponent } from 'src/app/component/post/add-post/add-post.component';
import { EditPostComponent } from 'src/app/component/post/edit-post/edit-post.component';
import { AttributeComponent } from 'src/app/component/attribute/attribute.component';
import { ReportComponent } from 'src/app/component/report/report.component';


const routes: Routes = [
  {
    path: 'admin', component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'MainLayout'},
    children: [
      {
        path: 'manufacturers',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'ShowManfacturer'},
            component: ShowManufacturerComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddManufacturer'},
            component: AddManufacturerComponent,
          },
          {
            path: 'edit/:id',
            data: { animation: 'EditManufacturer'},
            component: EditManufacturerComponent,
          },
        ]
      },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'ShowProduct'},
            component: ShowProductComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddProduct'},
            component: AddProductComponent,
          },
          {
            path: 'edit/:id',
            data: { animation: 'EditProduct'},
            component: EditProductComponent,
          },
        ]
      },
      {
        path: 'categories',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: ShowCategoryComponent,
          },
        ]
      },
      {
        path: 'orders',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: OrderComponent,
          },
        ]
      },
      {
        path: 'promotions',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: ShowPromotionComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddPromotion'},
            component: AddPromotionComponent,
          },
        ]
      },
      {
        path: 'index',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: IndexComponent,
          },

        ]
      },
      {
        path: 'reviews',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: ReviewComponent,
          },
        ]
      },
      {
        path: 'blogs',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'ShowProduct'},
            component: ShowPostComponent,
          },
          {
            path: 'add',
            data: { animation: 'AddProduct'},
            component: AddPostComponent,
          },
          {
            path: 'edit/:id',
            data: { animation: 'EditProduct'},
            component: EditPostComponent,
          },
        ]
      },
      {
        path: 'attributes',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: AttributeComponent,
          },
        ]
      },
      {
        path: 'reports',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            data: { animation: 'MainLayout'},
            component: ReportComponent,
          },
        ]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
