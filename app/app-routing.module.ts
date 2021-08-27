import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminindexComponent } from './components/admin/adminindex/adminindex.component';
import { AddauthorComponent } from './components/admin/author/addauthor/addauthor.component';
import { AuthordetailsComponent } from './components/admin/author/authordetails/authordetails.component';
import { AuthorlistComponent } from './components/admin/author/authorlist/authorlist.component';
import { UpdateauthorComponent } from './components/admin/author/updateauthor/updateauthor.component';
import { AddbookComponent } from './components/admin/book/addbook/addbook.component';
import { BookdetailsComponent } from './components/admin/book/bookdetails/bookdetails.component';
import { BooklistComponent } from './components/admin/book/booklist/booklist.component';
import { UpdatebookComponent } from './components/admin/book/updatebook/updatebook.component';
import { AddcategoryComponent } from './components/admin/category/addcategory/addcategory.component';
import { CategorydetailsComponent } from './components/admin/category/categorydetails/categorydetails.component';
import { CategorylistComponent } from './components/admin/category/categorylist/categorylist.component';
import { UpdatecategoryComponent } from './components/admin/category/updatecategory/updatecategory.component';
import { CategorybooklistComponent } from './components/categorybooklist/categorybooklist.component';
import { CategorybooklistdetailsComponent } from './components/categorybooklistdetails/categorybooklistdetails.component';



import { IndexComponent } from './components/index/index.component';


const routes: Routes = [

  {
    path:'test',
    component:AppComponent
  },

  {
    path:'bookList',
    component:BooklistComponent
  },
  {
    path:'addBook',
    component:AddbookComponent
  },
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'updateBook/:id',
    component:UpdatebookComponent
  },
  {
    path:'book-details/:id',
    component:BookdetailsComponent
  }

  ,
  {
    path:'categoryDetails/:id',
    component:CategorydetailsComponent
  }

  ,
  {
    path:'authorList',
    component:AuthorlistComponent
  },
  

  {
    path:'authordetails/:id',
    component:AuthordetailsComponent
    
  },
  {
    path:'updateAuthor/:id',
    component:UpdateauthorComponent
    
  },{
    path:'addAuthor',
    component:AddauthorComponent

  
  }
  ,{
    path:'categoryList',
    component:CategorylistComponent

  
  }
  ,{
    path:'addCategory',
    component:AddcategoryComponent

  
  }
  ,{
    path:'adminPanel',
    component:AdminindexComponent
  
  }
  ,{
    path:'categoryBookList/:id',
    component:CategorybooklistComponent
  
  }
  ,{
    path:'categoryBookListDetails/:id',
    component:CategorybooklistdetailsComponent
  
  },
  {
    path:'updateCategory/:id',
    component:UpdatecategoryComponent
    
  }
    


 











];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
