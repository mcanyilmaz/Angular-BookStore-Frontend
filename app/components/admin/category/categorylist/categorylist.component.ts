import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss']
})
export class CategorylistComponent implements OnInit {


  //@ts-ignore
  selectedFile:File;

  errorMessage:string="";

  //@ts-ignore
  succesMessage:string ="";

  //@ts-ignore
  id:number;
  //@ts-ignore
  category : Category[];

  myForm:FormGroup | undefined;

  form:FormGroup | undefined;

  
  selectedCategory:Category |undefined;

//@ts-ignore
  selectedId:number;

  constructor(private categoryService:CategoryService,
    private router:Router,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCategory();
    this.createCategorySearchAreaModalData();
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
     
      console.log(data);
    }))


  }
}

  
  createCategory2(){
    if(this.myForm?.valid){
            let payload = {
             
              categoryName:this.myForm?.controls['categoryName'].value
        
            }

          
            setTimeout(()=>{

              this.categoryService.addCategory(payload).pipe(catchError(err => {
                    
                throw  err;
              })).subscribe(category=>{
             
                console.log(category);
                Swal.fire(
                  'Kayıt Başarılı',
                  category.body.message,
                  'success'
                )

              //  console.log(category.body.message);
                this.getCategory();
 
              }
              );
             
            },1000)
           
          
    }
  
  }



  createCategory3(){
    const formData = new FormData();


    if(this.myForm?.valid){
            let payload = {
             
             categoryName:this.myForm?.controls['categoryName'].value
        
            }

         
            const jsonStringPayload = JSON.stringify(payload);

            if(this.selectedFile){
              formData.append('imageFile',this.selectedFile)
              formData.append('payload',jsonStringPayload);
            }


            console.warn(payload);
            setTimeout(()=>{

              //this.onUpload();
              this.categoryService.addCategory(formData).pipe(catchError(err => {
                console.warn(payload);
               
                throw  err;
              })).subscribe(data=>{
               this.getCategory();
              
              });
            },1000)
           
    
          
    }
  }



  //@ts-ignore
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
   
  }


  
updateCategory(){
  if(this.form?.valid){
          let payload = {
            id:this.form?.controls['id'].value,
            categoryName:this.form?.controls['categoryName'].value
          }

          setTimeout(()=>{
  
            this.categoryService.updateCategory(payload.id,payload).pipe(catchError(err => {
              console.warn(payload);
           
              throw  err;
            })).subscribe(food=>{
              this.getCategory();
            });
          },1000)
         
  
        
  }
}



  
  editCategory(category:Category){
    this.selectedCategory = category;
    //this.selectedId = author.id;


    this.form = this.formBuilder.group({
      id:[category.id],
      categoryName:[category.categoryName,[Validators.required]]

 
    })


    

}



  createCategory(){
    this.myForm = this.formBuilder.group({
      id:[null],
      categoryName:['']
    
    })
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

  setModalIdDeleteCategory(id:number){
    this.selectedId = id;
}


  deleteCategory(){
    this.categoryService.deleteCategory(this.selectedId).subscribe(data=>{
      console.log(data);
      Swal.fire(
        'Kategori Silindi',
        '',
        'success'
      )
      this.getCategory();
    })
  }
/*
  updateCategory(id : number){
    this.router.navigate(['updateCategory',id]);
  }
*/

}
