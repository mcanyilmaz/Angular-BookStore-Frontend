import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { AdminindexComponent } from './components/admin/adminindex/adminindex.component';
import { BooklistComponent } from './components/admin/book/booklist/booklist.component';
import { BookdetailsComponent } from './components/admin/book/bookdetails/bookdetails.component';
import { AddbookComponent } from './components/admin/book/addbook/addbook.component';
import { UpdatebookComponent } from './components/admin/book/updatebook/updatebook.component';
import { AddcategoryComponent } from './components/admin/category/addcategory/addcategory.component';
import { CategorylistComponent } from './components/admin/category/categorylist/categorylist.component';
import { UpdatecategoryComponent } from './components/admin/category/updatecategory/updatecategory.component';
import { CategorydetailsComponent } from './components/admin/category/categorydetails/categorydetails.component';
import { AddauthorComponent } from './components/admin/author/addauthor/addauthor.component';
import { AuthorlistComponent } from './components/admin/author/authorlist/authorlist.component';
import { UpdateauthorComponent } from './components/admin/author/updateauthor/updateauthor.component';
import { AuthordetailsComponent } from './components/admin/author/authordetails/authordetails.component';
import { CategorybooklistComponent } from './components/categorybooklist/categorybooklist.component';
import { CategorybooklistdetailsComponent } from './components/categorybooklistdetails/categorybooklistdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    BookdetailsComponent,
    AddbookComponent,
    UpdatebookComponent,
    AddcategoryComponent,
    CategorylistComponent,
    UpdatecategoryComponent,
    CategorydetailsComponent,
    AddauthorComponent,
    AuthorlistComponent,
    UpdateauthorComponent,
    AuthordetailsComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    AdminindexComponent,
    CategorybooklistComponent,
    CategorybooklistdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
