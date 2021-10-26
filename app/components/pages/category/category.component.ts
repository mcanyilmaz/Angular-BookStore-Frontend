import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivationStart, NavigationStart, Router } from '@angular/router';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category:Category[] | undefined;


  searchMessageResponse:string = '';
  form:FormGroup |undefined;

  constructor(private categoryService:CategoryService,
    private router:Router,
    private formBuilder:FormBuilder) {
     }

  ngOnInit(): void {
    this.getCategory();
    this.createCategorySearchAreaModalData();


   

  }

  categoriesDetails(id:number){

    this.router.navigate(['categoryBookList',id]);

  }

  createCategorySearchAreaModalData(){
      this.form = this.formBuilder.group({
      categoryName:[''],  
    })
  }

  getCategorySearchAreaData(){
    if(this.form?.valid){
      let payload = {    
        categoryName:this.form?.controls['categoryName'].value
      }
      this.categoryService.findByCategoryNameContaining(payload.categoryName).subscribe((data => {
        this.category = data;
        if(data.length==0){
          Swal.fire(
            'Hiçbir Sonuç Bulunamadı!',
            '',
            'warning'
          )
        }
        //this.categoryService.setCategory(data);
        console.log(data);
      }))



         /* if(payload.categoryName.length>0){
            this.categoryService.findByCategoryNameContaining(payload.categoryName).subscribe((data => {
              //this.category = data;
              this.categoryService.setCategory(data);
              console.log(data);
            }))
          }else{
            this.categoryService.findByCategoryNameContaining(payload.categoryName).subscribe((data => {
              //this.category = data;
              this.categoryService.setCategory(data);
              console.log(data);
              
            }))
          }
      */

    }

   


  }


  public findByCategoryNameContaining(categoryName:string){
    this.categoryService.findByCategoryNameContaining(categoryName).subscribe((data => {
      console.log(data);
    }))
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
