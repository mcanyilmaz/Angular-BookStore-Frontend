import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminindexComponent } from './components/admin/adminindex/adminindex.component';

import { AuthorlistComponent } from './components/admin/author/authorlist/authorlist.component';

import { BooklistComponent } from './components/admin/book/booklist/booklist.component';

import { CategorylistComponent } from './components/admin/category/categorylist/categorylist.component';
import { OrdersListComponent } from './components/admin/orders-list/orders-list.component';
import { SliderComponent } from './components/admin/slider/slider/slider.component';

import { CategorybooklistdetailsComponent } from './components/pages/categorybooklistdetails/categorybooklistdetails.component';
import { HomeComponent } from './components/home/home/home.component';



import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AuthorDetailsComponent } from './components/pages/author-details/author-details.component';
import { BasketComponent } from './components/pages/basket/basket/basket.component';
import { BuyProductComponent } from './components/pages/buy-product/buy-product.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { NotFoundComponent } from './components/pages/notFound/not-found/not-found.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserBookCommentsComponent } from './components/user/userBookComments/user-book-comments/user-book-comments.component';
import { UserOrdersComponent } from './components/user/userOrders/user-orders/user-orders.component';
import { AdminGuard } from './guard/AdminGuard';
import { LoginGuard } from './guard/LoginGuard';
import { CategorybooklistComponent } from './components/pages/categorybooklist/categorybooklist.component';


const routes: Routes = [

  //ALL NO Access Paths
  {path:'test',component:AppComponent},
  {path:'',component:IndexComponent},
  {path:'categoryBookList/:id',component:CategorybooklistComponent},
  {path:'categoryBookListDetails/:id',component:CategorybooklistdetailsComponent},
  {path:'buyProduct/:id',component:BuyProductComponent},
  {path: 'home', component: HomeComponent },
  {path:'authordetails/:id',component:AuthorDetailsComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'category',component:CategoryComponent},
  {path:'baskete',component:BasketComponent},
  
 
  // Admin Panel Paths
  {path:'bookList',component:BooklistComponent,canActivate:[AdminGuard]},
  {path:'categoryList',component:CategorylistComponent,canActivate:[AdminGuard]},
  {path:'authorList',component:AuthorlistComponent,canActivate:[AdminGuard]},
  {path:'adminPanel',component:AdminindexComponent,canActivate:[AdminGuard]},
  {path:'ordersList',component:OrdersListComponent,canActivate:[AdminGuard]},
  {path:'slider',component:SliderComponent,canActivate:[AdminGuard]},

    
//  { path: '**', pathMatch: 'full', component: NotFoundComponent },
  //{path: '**', pathMatch: 'full', component: NotFoundComponent},
 // {path: '**', redirectTo: '/404'},

  //Only User Access Paths
  {path: 'userDetails', component: UserDetailsComponent, canActivate:[LoginGuard]},
  {path: 'userOrders', component: UserOrdersComponent, canActivate:[LoginGuard]},
  {path: 'userBookComments', component: UserBookCommentsComponent, canActivate:[LoginGuard]},

 

 











];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
