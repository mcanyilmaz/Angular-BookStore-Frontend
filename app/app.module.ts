import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { AdminindexComponent } from './components/admin/adminindex/adminindex.component';
import { BooklistComponent } from './components/admin/book/booklist/booklist.component';


import { CategorylistComponent } from './components/admin/category/categorylist/categorylist.component';


import { AuthorlistComponent } from './components/admin/author/authorlist/authorlist.component';

import { AuthorDetailsComponent } from './components/pages/author-details/author-details.component';
import { BuyProductComponent } from './components/pages/buy-product/buy-product.component';
import { OrdersListComponent } from './components/admin/orders-list/orders-list.component';
import { authInterceptorProviders } from './service/helpers/AuthInterceptor';
import { HomeComponent } from './components/home/home/home.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { LoginGuard } from './guard/LoginGuard';
import { AdminGuard } from './guard/AdminGuard';
import { UserOrdersComponent } from './components/user/userOrders/user-orders/user-orders.component';
import { NotFoundComponent } from './components/pages/notFound/not-found/not-found.component';
import { UserBookCommentsComponent } from './components/user/userBookComments/user-book-comments/user-book-comments.component';
import { SliderComponent } from './components/admin/slider/slider/slider.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { BasketComponent } from './components/pages/basket/basket/basket.component';
import { CategorybooklistdetailsComponent } from './components/pages/categorybooklistdetails/categorybooklistdetails.component';
import { CategorybooklistComponent } from './components/pages/categorybooklist/categorybooklist.component';




@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,

    CategorylistComponent,


    AuthorlistComponent,


    HeaderComponent,
    FooterComponent,
    IndexComponent,
    AdminindexComponent,
    CategorybooklistComponent,
    
    CategorybooklistdetailsComponent,
    AuthorDetailsComponent,
    BuyProductComponent,
    OrdersListComponent,
    HomeComponent,
    UserDetailsComponent,
    UserOrdersComponent,
    NotFoundComponent,
    UserBookCommentsComponent,
    SliderComponent,
    ContactComponent,
    AboutComponent,
    CategoryComponent,
    BasketComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [authInterceptorProviders,LoginGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
