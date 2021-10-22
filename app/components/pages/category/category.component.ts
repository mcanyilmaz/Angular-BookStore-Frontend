import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category:Category[] | undefined;

  constructor(private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCategory();
  }

  categoriesDetails(id:number){

    this.router.navigate(['categoryBookList',id]);

  }


  public getCategory():void{
    this.categoryService.getCategory()
    .subscribe((data:Category[])=>{
      this.category = data;
    console.log(data);
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });

  }


}
