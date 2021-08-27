import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  
  // @ts-ignore
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  // @ts-ignore
  message: string;
  imageName: any;

  //@ts-ignore
  authors : Author[];
 //@ts-ignore
  categories : Category[];
 //@ts-ignore
  selected:string = '';

  constructor(private bookService:BookService,
    private categoryService:CategoryService,
    private authorService:AuthorService,
  private router:Router,
              private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllAuthor();
    this.getAllCategory();

    


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

  public onAddBook(addForm:NgForm):void{
    // @ts-ignore
    //document.getElementById('butonid').click();

    //console.log(selectedId);
 
    this.bookService.addBook(addForm.value).subscribe(
      (data:Book)=>{
        console.log(data);


      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }



    )

  }

  //Gets called when the user selects an image
  // @ts-ignore
  public onFileChanged(event) {
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
    this.httpClient.post('http://localhost:8080/v1/image/upload', uploadImageData, { observe: 'response' })
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
    this.httpClient.get('http://localhost:8080/v1/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


}

