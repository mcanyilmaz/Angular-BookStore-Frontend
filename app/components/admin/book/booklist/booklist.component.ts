import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {


  //IMAGE 

  
 //@ts-ignore
 selectedFile: File;
 retrievedImage: any;
 base64Data: any;
 retrieveResonse: any;
 //@ts-ignore
 message: string;
 imageName: any;


  // IMAGE




  // @ts-ignore
  id:number;
  // @ts-ignore
  books:Book[];

  // @ts-ignore
  books2:Book;

  // @ts-ignore
  bookName:string;

  // @ts-ignore
  getDataSearchArea:string;
  

  constructor(private bookService:BookService,
              private router:Router,
              private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getBooks();
   // this.id=this.router.snapshot.params['id'];

   


  }

  public getBooks():void{
    this.bookService.getBooks().subscribe(
      (data : Book[])=>{
      this.books=data;
    },(error:HttpErrorResponse)=>{
        alert(error.message);

      });
  }

  deleteBook1(id:number){
    this.bookService.deleteBook1(id).subscribe(data=>{
      console.log(data);
      this.getBooks();
    })
  }

  updateBook(id : number){
    this.router.navigate(['updateBook',id]);
  }

  bookDetails(id:number){

    this.router.navigate(['book-details',id]);

  }

  findBookName(bookName1:string):void{
    this.bookService.getByBookName(bookName1).subscribe(data =>{
      this.books=data;
      //@ts-ignore
      //this.bookName=this.router.snapshot.params['bookName'];
      //console.log(data);

    })
  }


  findBookName2(bookName2:string):void{
    this.bookService.getByBookName2(bookName2).subscribe(data =>{
      this.books2=data;
      //@ts-ignore
      //this.bookName=this.router.snapshot.params['bookName'];
      //console.log(data);

    })
  }



   public onSearch(searchForm:NgForm):void{

    this.getDataSearchArea = "asdfd";
    console.log(this.findBookName2("as"));
    //console.log(searchForm.value);
  
      
  }

 //Gets called when the user selects an image
 //@ts-ignore
 public onFileChanged( event) {
   //Select File
   this.selectedFile = event.target.files[0];
 }
 //Gets called when the user clicks on submit to upload the image
 onUpload() {
   console.log(this.selectedFile);
   
   //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
   const uploadImageData = new FormData();
   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
 
   //Make a call to the Spring Boot Application to save the image
   this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
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
   this.httpClient.get('http://localhost:8080/image/get/'+this.imageName)
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
