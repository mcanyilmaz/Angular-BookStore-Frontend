import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authorlist',
  templateUrl: './authorlist.component.html',
  styleUrls: ['./authorlist.component.scss']
})
export class AuthorlistComponent implements OnInit {


   //@ts-ignore
   message: string;
   //@ts-ignore
   selectedFile: File;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;



  //@ts-ignore
  id: number;

  //@ts-ignore
  author: Author[];

  authors:Array<Author> | undefined;




  //@ts-ignore
  selectedId:number;

  selectedAuthor: Author | undefined;

  form:FormGroup | undefined;

  myForm:FormGroup |undefined;

  form2:FormGroup | undefined;

  constructor(private authorService:AuthorService,
          private router:Router,
          private formBuilder:FormBuilder,
          private httpClient:HttpClient,
          private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
  
    this.getAllAuthor();
    this.createAuthorSearchAreaModal();
   
  }

  createAuthorSearchAreaModal(){
    this.form2 = this.formBuilder.group({
    authorName:[''],  
  })
}

getAuthorSearchAreaData(){
  if(this.form2?.valid){
    let payload = {    
      authorName:this.form?.controls['authorName'].value
    }
    this.authorService.findByAuthorNameContaining(payload.authorName).subscribe((data => {
      this.author = data;
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


  




  
  createAuthorModalData(){
    this.myForm = this.formBuilder.group({
      id:[null],
      authorName:[''],
      authorAbout:[''],
      imageName:['']
    
    })
  }


  createAuthor(){
    const formData = new FormData();


    if(this.myForm?.valid){
            let payload = {
             
              authorName:this.myForm?.controls['authorName'].value, 
              authorAbout:this.myForm?.controls['authorAbout'].value
              //imageName:this.selectedFile.name
        
            }

         
            const jsonStringPayload = JSON.stringify(payload);

            if(this.selectedFile){
              formData.append('imageFile',this.selectedFile)
              formData.append('payload',jsonStringPayload);
            }


            console.warn(payload);
            setTimeout(()=>{

              //this.onUpload();
              this.authorService.addAuthor2(formData).pipe(catchError(err => {
                console.warn(payload);
               
                throw  err;
              })).subscribe(data=>{
                this.getAllAuthor();
              
              });
            },1000)
           
    
          
    }
  }
  

  editAuthor(author:Author){
    this.selectedAuthor = author;
    this.selectedId = author.id;
    //this.getImageId();

    console.log(this.selectedAuthor.imageName);
    
    this.getImage();
    
    //this.getImageId(this.selectedId);

    this.form = this.formBuilder.group({
      id:[author.id],
      authorName:[author.authorName,[Validators.required]],
      authorAbout:[author.authorAbout,[Validators.required]]

     // author:[book6.author.authorName,[Validators.required]],
      //authorId:[book6.authorId,[Validators.required]],

      //categoryId:[book6.categoryId,[Validators.required]],
      //categoryId:[book6.category.categoryName,[Validators.required]],
      
      //authorId:[book6.author.authorName,[Validators.required]],

    })


    

}


getImageId() {
  //Make a call to Sprinf Boot to get the Image Bytes.

  this.httpClient.get('http://localhost:8080/image/getImageId/'+this.selectedId)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}


deleteModal(id:number){
  this.selectedId = id;
}


deleteBook1(){
  this.authorService.deleteAuthor(this.selectedId).subscribe(data=>{
    console.log(data);
    this.getAllAuthor();
    
  })
}


updateAuthor(){

  const formData = new FormData();


  if(this.form?.valid){
          let payload = {
            id:this.selectedId,
            authorName:this.form?.controls['authorName'].value,
            authorAbout:this.form?.controls['authorAbout'].value

          }
          console.log(payload);
          const jsonStringPayload = JSON.stringify(payload);

          if(this.selectedFile){
            formData.append('imageFile',this.selectedFile)
            formData.append('payload',jsonStringPayload);
          }


          setTimeout(()=>{
  
            this.authorService.updateAuthor2(formData).pipe(catchError(err => {
              console.warn(payload);
            
              throw  err;
            })).subscribe(data=>{
              this.getAllAuthor();
              
            });
          },1000)
         
  
        
  }
}



  public getAllAuthor():void{
    this.authorService.getAllAuthor().subscribe(
      (data)=>{
        this.author = data;
        console.log(data);
        },(error:HttpErrorResponse)=>{
          alert(error.message);
        });
  }


  
  deleteAuthor(id:number){
    this.authorService.deleteAuthor(id).subscribe(data=>{
      console.log(data);
      this.getAllAuthor();
    })
  }

  /*updateAuthor(id : number){
    this.router.navigate(['updateAuthor',id]);
  }*/

  authorDetails(id:number){

    this.router.navigate(['authordetails',id]);

  }

  

  //Gets called when the user clicks on retieve image button to get the image from back end 
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/'+this.selectedAuthor?.imageName)
      .subscribe(
        res => {
      
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
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







}
