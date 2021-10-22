import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';
import { Image } from 'src/app/service/image/image';
import { ImageService } from 'src/app/service/image/image.service';
import { UserService } from 'src/app/service/user/user.service';
import {catchError} from "rxjs/operators";
import { User } from 'src/app/service/user/user';
import { Slider } from 'src/app/service/slider/slider';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  page:number=0;

  authorPageable:Array<any> | undefined;

  pages:Array<number> | undefined;

  //@ts-ignore
  sliderGetDataLenght:number;

  
   //@ts-ignore
 retrievedImage: any;
    //@ts-ignore
 base64Data: any;
    //@ts-ignore
 retrieveResonse: any;



 setAuthorName:string |undefined;
  
   // @ts-ignore
   id:number;
   // @ts-ignore
   category:Category[];
      // @ts-ignore
      books:Book[];
   // @ts-ignore
    authors:Author[];

    // @ts-ignore
    image1:Image[];

    imageName: any;

    // @ts-ignore
    sliderImages:Slider[];

     // @ts-ignore
     userModel:UserModel[];

    form:FormGroup | undefined;
    myForm:FormGroup | undefined;
    operationStatus = false;

    deleteOperationMessage:any;

    testData:any;

    user:User | undefined;

  constructor(private categoryService:CategoryService,
    private bookService:BookService,
    private authorService:AuthorService,
    private router:Router,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder,
    private imageService:ImageService,
    private userService:UserService) { 


  }

  ngOnInit(): void {
    
    this.getCategory();
    this.getBookSort();
    this.getAllAuthor();
    //this.getImage();
    //this.getImages1();
    //this.getImageler();
    this.getImageOrj();


    this.pageableAuthor(4,1);

    this.getImageler();

 
  }


  

  getImageler() {
    
    this.imageService.getImagesInSliderViewTrue().subscribe((data => {
      this.sliderImages = data;
      this.sliderGetDataLenght = data.length;
      
      console.log(data);
    }))

  }




  
  public pageableAuthor(id:number,pageSize:number){
    this.authorService.pageableAuthor(id,pageSize).subscribe(data =>{
   
       //@ts-ignore
       this.authorPageable= data['content'];
       console.log(data);
       //@ts-ignore
      this.pages = new Array(data['totalPages']);

      
      });
  
  }

  setPage(i:any,event:any){
    event.preventDefault();
    this.page=i;
     this.pageableAuthor(4,this.page);
  }







//Gets called when the user clicks on retieve image button to get the image from back end 
getImageOrj() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.httpClient.get('http://localhost:8080/image/get/'+"resim2.jpg")
    .subscribe(
      res => {
      
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}
/*
  public getImages1():void{
   //@ts-ignore
    this.imageService.getImages().subscribe(
      (data : Image[])=>{
      this.image1=data;
      
      this.retrieveResonse = data;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    },(error:HttpErrorResponse)=>{
        alert(error.message);

      });
  }

*/

// POP UP MODAL MENU KAYIT OL FONKSİYONU


/*
public onAddUser(addForm:NgForm):void{

  this.userService.addUser2(addForm.value).subscribe(
    (data:User)=>{
      console.log(data);


    },(error:HttpErrorResponse)=>{
      alert(error.message);
    })

}
*/







  // kitapları sıralı oluşturulma zamanına göre çektim.

  public getBookSort():void{
    this.bookService.getBookSort()
    .subscribe((data:Book[])=>{
      this.books = data;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });
  }


  public getCategory():void{
    this.categoryService.getCategory()
    .subscribe((data:Category[])=>{
      this.category = data;

    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });

  }

  public getAllAuthor():void{
    this.authorService.getAllAuthor()
    .subscribe((data:Author[])=>{
      this.authors=data;

    },(error:HttpErrorResponse)=>{
      alert(error.message);
    });
  }

  categoriesDetails(id:number){

    this.router.navigate(['categoryBookList',id]);

  }
 
  authorDetails(id:number){

    this.router.navigate(['authordetails',id]);
   
  }

  categoryOneBookDetails(id:number){

    this.router.navigate(['categoryBookListDetails',id]);

  }
   /*
   getImage() {
  
    this.httpClient.get('http://localhost:8080/image/getAll')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
 */
/*
  getImageler() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/'+this.imageName)
      .subscribe(
        res => {
        
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  */
 






  create(){
    this.form = this.formBuilder.group({
      id:[null],
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required]]
    })


  
  }


/*
  createOrUpdate(){
        if(this.form?.valid){
                let payload = {
                  id:this.form?.controls['id'].value,
                  username:this.form?.controls['username'].value,
                  password:this.form?.controls['password'].value,
                  email:this.form?.controls['email'].value  
                }

                console.warn(payload);

                  this.userService.addUser2(payload).pipe(catchError(err => {
                    throw  err;
                  })).subscribe(food=>{
                
                    console.warn(food);
                  });
               
               
        
              
        }
   }
*/
/*

   kaydet2(){
    this.myForm = this.formBuilder.group({
      id:[null],
      bookName:[''],
      bookDetails:[''],  
      bookPrice:['',],
      bookStock:[''],
      authorId:[''],
      categoryId:['']
    })
  }


  
  kaydet(){
    if(this.myForm?.valid){
            let payload = {
              id:this.myForm?.controls['id'].value,
              bookName:this.myForm?.controls['bookName'].value,
              bookDetails:this.myForm?.controls['bookDetails'].value,
              bookPrice:this.myForm?.controls['bookPrice'].value, 
              bookStock:this.myForm?.controls['bookStock'].value,
              authorId:this.myForm?.controls['authorId'].value,
              categoryId:this.myForm?.controls['categoryId'].value

        
            }
           
            this.operationStatus = true;
            console.warn(payload);
            setTimeout(()=>{
          
              this.bookService.addBook2(payload).pipe(catchError(err => {
                console.warn(payload);
                this.operationStatus = false;
                throw  err;
              })).subscribe(food=>{
                this.operationStatus = false;
                if(payload.id == null){
                  this.form?.reset();
                }
              });
            },1000)
           
    
          
    }
  }


*/


  
}

