import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { MainLayoutModule } from "./page/main-layout/main-layout.module";

import { AppComponent } from "./app.component";
import { SwaggerComponent } from "./component/swagger/swagger.component";
import { LoginComponent } from "./component/login/login.component";
import { PageNotFoundComponent } from "./component/page-not-found/page-not-found.component";
import { ReactiveFormsModule } from '@angular/forms';

import { ClientModule } from './client-component/client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    SwaggerComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainLayoutModule,
    ClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
