import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss']
})
export class CategorylistComponent implements OnInit {

  //@ts-ignore
  id:number;
  //@ts-ignore
  category : Category[];

  constructor(private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory():void{
    this.categoryService.getCategory()
    .subscribe((data:Category[])=>{
      this.category = data;

    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });

  } 


  categoryDetails(id:number){
    this.router.navigate(['categoryDetails',id]);

  }

  deleteCategory1(id:number){
    this.categoryService.deleteCategory(id).subscribe(data=>{
      console.log(data);
      this.getCategory();
    })
  }

  updateCategory(id : number){
    this.router.navigate(['updateCategory',id]);
  }


}
