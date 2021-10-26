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
   this.getAllAuthor();
   this.getAllCategory();
   this.registerForm();
  }

   //@ts-ignore
 public onFileChanged( event) {
  //Select File
  this.selectedFile = event.target.files[0];
 
 
}




createBook(){

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

  searchBook(){
    if(this.myForm2?.valid){
            let payload = {
            
              bookName:this.myForm2?.controls['searchName'].value
            }
        
             console.log(payload.bookName);
              this.bookService.findByBookName(payload.bookName).subscribe(data =>{
                this.books=data;
               
                console.log(data);
             
          
              })
           
          
              
            
          
       
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

  updateBookModal(book:Book){
    this.selectedBook = book;

    this.selectedId =book.id;
    this.selectedBook.bookImageName;

    //this.getImage();
    this.form = this.formBuilder.group({
      id:[book.id],
      bookName:[book.bookName,[Validators.required]],
      bookStock:[book.bookStock,[Validators.required]],
      bookPrice:[book.bookPrice,[Validators.required]],
      bookDetails:[book.bookDetails],
      authorId:[book.author.authorName,[Validators.required]],
      categoryId:[book.category.categoryName,[Validators.required]]

    })

}


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

  

  createBookModal(){
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


  updateBook(){
    const formData = new FormData();


    if(this.form?.valid){
            let payload = {
              id:this.selectedId,
              bookName:this.form?.controls['bookName'].value,
              bookDetails:this.form?.controls['bookDetails'].value,
              bookPrice:this.form?.controls['bookPrice'].value, 
              bookStock:this.form?.controls['bookStock'].value,
              authorId:this.form?.controls['authorId'].value,
              categoryId:this.form?.controls['categoryId'].value
             
        
            }
        
            console.log(payload.authorId);
            console.log(payload.categoryId);

            const jsonStringPayload = JSON.stringify(payload);

            if(this.selectedFile){
              formData.append('imageFile',this.selectedFile)
              formData.append('payload',jsonStringPayload);
            }

            
        
            setTimeout(()=>{
    
          
              this.bookService.updateBook2(formData).pipe(catchError(err => {
                console.warn(payload);
                Swal.fire(
                  'Güncelleme Başarısız !',
                  '',
                  'warning'
                )
                throw  err;

              })).subscribe(data=>{

                Swal.fire(
                  'Güncelleme Başarılı !',
                  '',
                  'success'
                )
                this.getBooks();
               
                console.log(data);
                
              });
            },1000)
           
    
          
    }
  }

  




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
