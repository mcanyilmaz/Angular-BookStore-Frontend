import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { CategoryService } from 'src/app/service/Category/category.service';
import { Image } from 'src/app/service/image/image';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
  selector: 'app-categorybooklist',
  templateUrl: './categorybooklist.component.html',
  styleUrls: ['./categorybooklist.component.scss']
})
export class CategorybooklistComponent implements OnInit {

   page:number=0;

  
   bookPageble:Array<Book> | undefined;

   pages:Array<number> | undefined;




  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
 //@ts-ignore
  retrievedImage2:any;
  base64Data2:string[] | undefined;
  //@ts-ignore
   retrieveResonse2: string[];

  
   tempBook:Array<any> |undefined;


  testDatam: any;
  //@ts-ignore
  id:number;
 //@ts-ignore
  book:Book;

  //@ts-ignore
  book1: Book[];

   //@ts-ignore
   book2: Book[];

    //@ts-ignore
    imagesler: Image[];

    //@ts-ignore
    resimler:Image[];

    //@ts-ignore
    resimTek:Image;


    addToBasketBook:Book | undefined;

  myForm:FormGroup | undefined;


  constructor(private route:ActivatedRoute,
    private bookService:BookService,
    private categoryService: CategoryService,
    private router:Router,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder,
    private imageService:ImageService) { }

  ngOnInit(): void {

 

    this.id=this.route.snapshot.params['id'];
    this.pageableBook(this.id,this.page);
    this.searchForm();

  /*  this.bookService.getByCategoryId(this.id).subscribe(data =>{
     this.book1 = data;
      
     
    });*/

  }



  public addToBasketAndPay(id:number){
    this.router.navigate(['buyProduct',id]);
  }
 
  setPage(i:any,event:any){
    event.preventDefault();
    this.page=i;
     this.pageableBook(this.id,this.page);
  }

  



  searchForm(){
    this.myForm = this.formBuilder.group({
     
      bookName:[''],
      
    })
  }

  searchData(){
    if(this.myForm?.valid){
            let payload = {
            
              bookName:this.myForm?.controls['bookName'].value
    
            }
            if(payload.bookName==''){
              console.log("bnoş");
              
            }else{
              this.bookService.findByBookName(payload.bookName).subscribe(data =>{
               // this.book1=data;
               this.bookPageble = data;
                //@ts-ignore
                //this.bookName=this.router.snapshot.params['bookName'];
                console.log(data);
             
          
              })
            }
          
              
            
          
       
    }
  

  }



  


  public pageableBook(id:number,pageSize:number){
    this.bookService.pageableBook3(id,pageSize).subscribe(data =>{
   
       //@ts-ignore
       this.bookPageble= data['content'];
       //@ts-ignore
      this.pages = new Array(data['totalPages']);


      console.log(this.bookPageble);

      });
  
  }


 





 


  categoryOneBookDetails(id:number){

    this.router.navigate(['categoryBookListDetails',id]);

  }


}