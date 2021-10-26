import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';
import { CommentService } from 'src/app/service/Comment/comment.service';
import {catchError} from 'rxjs/operators'; 
import { Comments } from 'src/app/service/Comment/comments';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-categorybooklistdetails',
  templateUrl: './categorybooklistdetails.component.html',
  styleUrls: ['./categorybooklistdetails.component.scss']
})
export class CategorybooklistdetailsComponent implements OnInit {


  commentList:number = 4;
  
  page:number=0;

  
  //@ts-ignore
  pageableComment:Array<any>;

  pages:Array<number> | undefined;


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;

  isBookStockIn = true;


  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  retrievedImage2: any;
  base64Data2: any;
  retrieveResonse2: any;


  //@ts-ignore
  userAddress:string;

  userAddressCheck:boolean = false;


 //@ts-ignore
  comments:Comments[];

 //@ts-ignore
 id:number;
 //@ts-ignore
  book:Book;

  //@ts-ignore
  ratingBookData: Book;


  form:FormGroup | undefined;

  arr: any[] = [];
	index:number = -1;

  //@ts-ignore
  myForm:FormGroup;
  //@ts-ignore
  myForm2:FormGroup;


  ratingBarVisible:Boolean = true;



  constructor(private bookService:BookService,
    private route:ActivatedRoute,
    private router:Router,
    private commentService:CommentService,
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private tokenStorage: TokenStorageService,
    private cartService:CartService ) { }

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

    this.getBookById(this.id);
    /*this.bookService.getBookById(this.id).subscribe(data =>{
    this.book = data;


    if(data.bookStock==0){
      this.isBookStockIn = false;
    }
  

    });*/

    this.registerForm();
   // this.findAllCommentBookId();
   
    this.getByBookIdPageable(this.id,this.page,this.commentList);
    this.arr = [1, 2, 3, 4, 5];


    this.starBar();

    if(this.pageableComment?.length==0){
      console.log("yorum yok");
    }


  }

  
  addtocart(item: any){
    this.cartService.addtoCart(item);
    Swal.fire({
      icon: 'success',
      text: 'Ürün Sepete Başarıyla Eklendi!',


    })
  
  }

  public getBookById(id:number){
    this.bookService.getBookById(id).subscribe((data => {
      if(data.bookStock==0){
        this.isBookStockIn = false;
      }
      this.book = data;
    }))
  }

  starBar(){
    this.myForm2 = this.formBuilder.group({
      
      star:['']
     
    })
  }

   //@ts-ignore
   onChange($event) {


    let data = {
   
      id:this.id,
      rating:this.myForm2?.controls["star"].value
    };


    this.bookService.setBookRatingValue(data).subscribe((getData => {
      this.ratingBookData = getData;
      Swal.fire(
        'Değerlendirme Başarılı!',
        data.rating + ' Yıldız',
        'success'
      )
      this.ratingBarVisible=false;
      this.getBookById(this.id);
      console.log(getData);
    }))
 
  }

  onClickItem(index:number) {
		//console.log(index);
		this.index = index;
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





  registerForm(){
    this.form = this.formBuilder.group({
      id:[null],
      comment:[''],
      bookId:[this.id],
      
    })
  }

  setPage(i:any,event:any){
    event.preventDefault();
    this.page=i;
    this.choose(this.commentList);
     this.getByBookIdPageable(this.id,this.page,4);
  }


  public getByBookIdPageable(bookId:number,pageSize:number,commentsList:number){
    this.commentService.getByBookIdPageable(bookId,pageSize,commentsList).subscribe(data =>{
   
       //@ts-ignore
       this.pageableComment= data['content'];
       //@ts-ignore
      this.pages = new Array(data['totalPages']);
    //  console.log("data bu");
     
    //console.log(this.pageableComment?.length);
      if(this.pageableComment?.length==0){


        console.log("data yok");
      }
   
      });
  
  }


    public choose(commentList:number){

      this.commentList = commentList;

        this.getByBookIdPageable(this.id,this.page,commentList);
    }



  kaydet(){
    if(this.form?.valid){
            let payload = {
              bookId:this.id,
              comment:this.form?.controls['comment'].value,
              userId:this.tokenStorage.getUser().id
            }
           
          
            if(payload.comment.length==0){
              Swal.fire(
                'Lütfen Yorum Giriniz!',
                'Bu alan boş bırakılamaz',
                'warning'
              )
        
            }else{

            setTimeout(()=>{

              this.commentService.addComment2(payload).pipe(catchError(err => {
                //console.warn(payload);
              
                throw  err;
              })).subscribe(data=>{
            
                Swal.fire(
                  'Yorumunuz Eklendi!',
                  '',
                  'success'
                )
               // window.location.reload();

              });
            },1000)

          }
           
    
          
    }
  }

  public findAllCommentBookId():void{

    this.commentService.findAllBookId(this.id).subscribe(
      (data:Comments[])=>{
       this.comments=data;
       //console.log(data);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      })

  }

  public getAllComments():void{

    this.commentService.getComments().subscribe(
      (data:Comments[])=>{
       this.comments=data;
      // console.log(data);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      })

  }
/*
  public addComment(addForm:NgForm):void{
    this.commentService.addComment(addForm.value).subscribe(
      (data:Comments)=>{
        console.log(data);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      })
  }*/




}
