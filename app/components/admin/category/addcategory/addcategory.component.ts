import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {



  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
  }



   onAddCategory(addForm:NgForm):void{

    this.categoryService.addCategory(addForm.value).subscribe(
      (data:Category)=>{
        console.log(data);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
    
  }

}
