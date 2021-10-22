import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import {catchError} from 'rxjs/operators'; 
import { AuthorService } from 'src/app/service/AuthorService/author.service';
import { Author } from 'src/app/service/AuthorService/author';
import { CategoryService } from 'src/app/service/Category/category.service';
import { Category } from 'src/app/service/Category/category';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {


  //IMAGE 

   //@ts-ignore
 message: string;
 //@ts-ignore
 selectedFile: File;
 retrievedImage: any;
 base64Data: any;
 retrieveResonse: any;

 imageName: any;


 tempBook:Book[] | undefined;
 tempBook2:Book | undefined;

     title = 'Food List'

    foods : Book[] = [];

    selectedBook: Book | undefined;

    private sub:any;

    form:FormGroup | undefined;

    
    myForm:FormGroup | undefined;

    myForm2:FormGroup | undefined;

    operationStatus = false;

    deleteOperationMessage:any;

    //@ts-ignore
    selectedId:number;

    authors : Author[] = [];

    //@ts-ignore
    categories:Category[];
  // @ts-ignore
  id:number;
  // @ts-ignore
  books:Book[];

  // @ts-ignore
  books2:Book;

  // @ts-ignore
  books3:Book;

  // @ts-ignore
  bookName:string;

  // @ts-ignore
  getDataSearchArea:string;

  fakeArray = new Array(12);

  constructor(private bookService:BookService,
              private router:Router,
              private httpClient:HttpClient,
              private formBuilder:FormBuilder,
              private authorService:AuthorService,
              private categoryService:CategoryService
            ) { }

  ngOnInit(): void {
    this.getBooks();
   // this.id=this.router.snapshot.params['id'];

   this.getAllAuthor();
   this.getAllCategory();
  

   this.registerForm();

   //this.getImage();

  
  // this.pageableBooks(1);

  //this.findBookName(this.getDataSearchArea);



  }

   //@ts-ignore
 public onFileChanged( event) {
  //Select File
  this.selectedFile = event.target.files[0];
 
 
}




kaydet3(){
  //const uploadImageData = new FormData();
      //  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      const formData = new FormData();

  if(this.myForm?.valid){
          let payload = {
            id:this.myForm?.controls['id'].value,
            bookName:this.myForm?.controls['bookName'].value,
            bookDetails:this.myForm?.controls['bookDetails'].value,
            bookPrice:this.myForm?.controls['bookPrice'].value, 
            bookStock:this.myForm?.controls['bookStock'].value,
            authorId:this.myForm?.controls['authorId'].value,
            categoryId:this.myForm?.controls['categoryId'].value,
            
          }

          const jsonStringPayload = JSON.stringify(payload);

        if(this.selectedFile){
          formData.append('imageFile',this.selectedFile)
          formData.append('payload',jsonStringPayload);
        }
         
          this.operationStatus = true;
          console.warn(payload);
         // console.log(uploadImageData);
          setTimeout(()=>{

            this.bookService.addBook(formData).pipe(catchError(err => {
              //console.warn(payload);
              this.operationStatus = false;
              console.log("hata");
              Swal.fire(
                'Giriş Başarısız!',
                'Lütfen bilgilerinizi gözden geçirin',
                'warning'
              )

              throw  err;
            })).subscribe(book=>{
             //this.onUpload();
            
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Kayıt Başarılı!',
                showConfirmButton: true,
               
              })

             // this.getBooks();
             
            });
          },1000)
         
  
        
  }else{
    Swal.fire(
      'Hata',
      'Boş Alanları Doldurunuz.',
      'warning'
    )
  }
}








kaydet(){
  const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  if(this.myForm?.valid){
          let payload = {
            id:this.myForm?.controls['id'].value,
            bookName:this.myForm?.controls['bookName'].value,
            bookDetails:this.myForm?.controls['bookDetails'].value,
            bookPrice:this.myForm?.controls['bookPrice'].value, 
            bookStock:this.myForm?.controls['bookStock'].value,
            authorId:this.myForm?.controls['authorId'].value,
            categoryId:this.myForm?.controls['categoryId'].value,
            
          }
         
          let payload2={

          }
       
         //if(payload.bookImageName.toString.length>=0){
        //   console.log("test");
        // }

       


          this.operationStatus = true;
          console.warn(payload);
          console.log(uploadImageData);
          setTimeout(()=>{
        
          
           
            this.bookService.addBook2(payload).pipe(catchError(err => {
              //console.warn(payload);
              this.operationStatus = false;
              console.log("hata");
              Swal.fire(
                'Giriş Başarısız!',
                'Lütfen bilgilerinizi gözden geçirin',
                'warning'
              )

              throw  err;
            })).subscribe(food=>{
             this.onUpload();
            
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Kayıt Başarılı!',
                showConfirmButton: true,
               
              })

              this.getBooks();
             
            });
          },1000)
         
  
        
  }else{
    Swal.fire(
      'Hata',
      'Boş Alanları Doldurunuz.',
      'warning'
    )
  }
}



  

  registerForm(){
    this.myForm2 = this.formBuilder.group({
     
      searchName:[''],
      
    })
  }

  searchKaydet(){
    if(this.myForm2?.valid){
            let payload = {
            
              bookName:this.myForm2?.controls['searchName'].value
    
            }
            //if(payload.comment==''){
              //console.log("bnoş");
             // this.getBooks();
           // }else{
             console.log(payload.bookName);
              this.bookService.findByBookName(payload.bookName).subscribe(data =>{
                this.books=data;
                //@ts-ignore
                //this.bookName=this.router.snapshot.params['bookName'];
                console.log(data);
             
          
              })
            //}
          
              
            
          
       
    }
  

  }


  findBookName(bookName1:string):void{
    this.bookService.getByBookName(bookName1).subscribe(data =>{
      this.books=data;
      
      //@ts-ignore
      //this.bookName=this.router.snapshot.params['bookName'];
      console.log(data);
      this.router.navigate(['authorList']);
    })
  }


 


  

   public onSearch():void{


    //this.getDataSearchArea = searchForm.value;



    console.log(this.getDataSearchArea);

    this.findBookName(this.getDataSearchArea);
   
  
  
      
  }

  edit(book6:Book){
    this.selectedBook = book6;

    this.selectedBook.bookImageName;

    //this.getImage();
    this.form = this.formBuilder.group({
      id:[book6.id],
      bookName:[book6.bookName,[Validators.required]],
      bookStock:[book6.bookStock,[Validators.required]],
      bookPrice:[book6.bookPrice,[Validators.required]],
      bookDetails:[book6.bookDetails],

      //author:[book6.author.authorName,[Validators.required]],
      //authorId:[book6.authorId,[Validators.required]],

      //categoryId:[book6.categoryId,[Validators.required]],
      authorId:[book6.author.authorName,[Validators.required]],
      categoryId:[book6.category.categoryName,[Validators.required]]
      
     

    })

}

/*
createOrUpdate(){
  if(this.form?.valid){
     let payload = {
       id:this.form?.controls['id'].value,
       bookName:this.form?.controls['bookName'].value,
       bookStock:this.form?.controls['bookStock'].value,
       bookPrice:this.form?.controls['bookPrice'].value,
       bookDetails:this.form?.controls['bookDetails'].value,
       
     }
     this.operationStatus = true;
     setTimeout(()=>{
       this.bookService.updateBook2(payload).pipe(catchError(err => {
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

public pageableBooks(pageSize:number){
  this.bookService.pagebleBook(pageSize).subscribe(data =>{
    this.tempBook= data;
    console.log(data);
    });

}

  public getBooks():void{
    this.bookService.getBooks().subscribe(
      (data : Book[])=>{
      this.books=data;
      console.log(data);
    
    },(error:HttpErrorResponse)=>{
        alert(error.message);

      });
  }


  deleteModal(id:number){
    this.selectedId = id;
}


  deleteBook1(){
    this.bookService.deleteBook1(this.selectedId).subscribe(data=>{
      console.log(data);
      this.getBooks();
    })
  }

  updateBook(id : number){
    //this.router.navigate(['updateBook',id]);

    this.bookService.getBookById(this.id).subscribe(data =>{
      this.books3= data;
      });

      
  }

  bookDetails(id:number){

    this.router.navigate(['book-details',id]);

  }

  public getAllAuthor():void{
    this.authorService.getAllAuthor().subscribe(
      (data:Author[])=>{
        this.authors = data;
      },(error : HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public getAllCategory():void{
    this.categoryService.getCategory().subscribe(
      (data:Category[])=>{
        this.categories = data;
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      });
  
  }

  

  kaydet2(){
    this.myForm = this.formBuilder.group({
      id:[null],
      bookName:['',[Validators.required]],
      bookDetails:['',[Validators.required]],  
      bookPrice:['',[Validators.required]],
      bookStock:['',[Validators.required]],
      authorId:['',[Validators.required]],
      categoryId:[null,[Validators.required]],
      bookImageName:['']
      
    })
  }


  guncelle(){
    if(this.form?.valid){
            let payload = {
              id:this.form?.controls['id'].value,
              bookName:this.form?.controls['bookName'].value,
              bookDetails:this.form?.controls['bookDetails'].value,
              bookPrice:this.form?.controls['bookPrice'].value, 
              bookStock:this.form?.controls['bookStock'].value,
              authorId:this.form?.controls['authorId'].value,
              categoryId:this.form?.controls['categoryId'].value
             
        
            }
        
            console.log(payload.authorId);
            console.log(payload.categoryId);

        
            setTimeout(()=>{
    
             // this.onUpload();
              this.bookService.updateBook2(payload.id,payload).pipe(catchError(err => {
                console.warn(payload);
       
                throw  err;
              })).subscribe(food=>{

                console.log(food);
                
              });
            },1000)
           
    
          
    }
  }

  
/*
  public updateBook(){
    this.bookService.updateBook(this.id,this.payload).subscribe(data=>{
      console.log(data);

    },error => console.log(error));
  }*/






   //Gets called when the user selects an image

//Gets called when the user clicks on submit to upload the image
onUpload() {
  console.log(this.selectedFile);
  
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

  //Make a call to the Spring Boot Application to save the image
  this.httpClient.post('http://localhost:8080/slider/upload', uploadImageData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );
}


   //Gets called when the user clicks on retieve image button to get the image from back end 
   getImage() {
   //Make a call to Sprinf Boot to get the Image Bytes.
   this.httpClient.get('http://localhost:8080/image/get/'+this.selectedBook?.bookImageName)
     .subscribe(
       res => {
     
         this.retrieveResonse = res;
         this.base64Data = this.retrieveResonse.picByte;
         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
       }
     );
 }


 getImageId(id:number) {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.httpClient.get('http://localhost:8080/image/getImageId/'+id)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}







/*
    this.getDataSearchArea = searchForm.value;
    // console.log(this.books[1].bookName);

     for(let i=0; i<this.books.length; i++){


        if(this.books[i].bookName==this.getDataSearchArea){
           console.log("eşit");
           break;
        }else{
          console.log(searchForm.value);
          console.log("eşit degil");
          break;
        }
       
     
}
    console.log("döngü kırıldı");*/
    

/*  public findUserByEmailId(){
    let resp= this.bookService.getByBookName(this.bookName);
    resp.subscribe((data)=>this.books=data);
  }*/


}
