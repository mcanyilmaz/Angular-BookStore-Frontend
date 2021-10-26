import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { CategoryService } from 'src/app/service/Category/category.service';
import { Image } from 'src/app/service/image/image';
import { ImageService } from 'src/app/service/image/image.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorybooklist',
  templateUrl: './categorybooklist.component.html',
  styleUrls: ['./categorybooklist.component.scss']
})
export class CategorybooklistComponent implements OnInit {

  public bookList : any ;



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

  isLoggedIn = false;
  //@ts-ignore
  userAddress:string;

  userAddressCheck:boolean = false;


  constructor(private route:ActivatedRoute,
    private bookService:BookService,
    private categoryService: CategoryService,
    private router:Router,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder,
    private imageService:ImageService,
    private tokenStorage:TokenStorageService,
    private cartService:CartService) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.userAddress = user.userAddress;
    }

    if(this.userAddress=="henüz girilmedi"){
      this.userAddressCheck = false;
    }else{
      this.userAddressCheck = true;
    }

    this.id=this.route.snapshot.params['id'];
    this.pageableBook(this.id,this.page);
    this.searchForm();

  /*  this.bookService.getByCategoryId(this.id).subscribe(data =>{
     this.book1 = data;
      
     
    });*/

  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
    Swal.fire({
      icon: 'success',
      text: 'Ürün Sepete Başarıyla Eklendi!',


    })
  
  }



  public addToBasketAndPay(id:number){
  
    if(this.isLoggedIn!=true){
      Swal.fire({
        icon: 'warning',
        text: 'Satın Almak İçin Giriş Yapmalısınız!',
       
      })
      setTimeout(()=>{


        this.router.navigate(['/'])

      }),1000;
      
     
      
    }else{
      if(this.userAddressCheck==true)
      {
        this.router.navigate(['buyProduct',id]);

      }else{
        Swal.fire({
          icon: 'warning',
          text: 'Satın Almak İçin Addres Bilginizi Güncelleyin!',
         
        })
        this.router.navigate(['userDetails']);

        
      }

    }
    


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
           
              this.bookService.findByBookName(payload.bookName).subscribe(data =>{
               // this.book1=data;
               this.bookPageble = data;
                //@ts-ignore
                //this.bookName=this.router.snapshot.params['bookName'];
                console.log(data);
             
          
              })
            
          
              
            
          
       
    }
  

  }



  


  public pageableBook(id:number,pageSize:number){
    this.bookService.pageableBook3(id,pageSize).subscribe(data =>{
   
       //@ts-ignore
       this.bookPageble= data['content'];
       //@ts-ignore
      this.pages = new Array(data['totalPages']);

             //@ts-ignore
      this.productList = data['content'];




      console.log(this.bookPageble);

      });
  
  }


  categoryOneBookDetails(id:number){

    this.router.navigate(['categoryBookListDetails',id]);

  }


  
}







