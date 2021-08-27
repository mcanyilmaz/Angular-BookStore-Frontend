import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';
import { Image } from 'src/app/service/image/image';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  
   //@ts-ignore
 retrievedImage: any;
    //@ts-ignore
 base64Data: any;
    //@ts-ignore
 retrieveResonse: any;

  
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
 


  constructor(private categoryService:CategoryService,
    private bookService:BookService,
    private authorService:AuthorService,
    private router:Router,
    private httpClient:HttpClient,
    private imageService:ImageService) { 


  }

  ngOnInit(): void {
    this.getCategory();
    this.getBookSort();
    this.getAllAuthor();
    this.getImage();
    this.getImages1();
  }

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


  
}

