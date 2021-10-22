import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';
import { CommentService } from 'src/app/service/Comment/comment.service';
import {catchError} from 'rxjs/operators'; 
import { Comments } from 'src/app/service/Comment/comments';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorybooklistdetails',
  templateUrl: './categorybooklistdetails.component.html',
  styleUrls: ['./categorybooklistdetails.component.scss']
})
export class CategorybooklistdetailsComponent implements OnInit {


  commentList:number = 4;
  
  page:number=0;

  
  pageableComment:Array<any> | undefined;

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
  book1: Book[];


  form:FormGroup | undefined;

  constructor(private bookService:BookService,
    private route:ActivatedRoute,
    private router:Router,
    private commentService:CommentService,
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private tokenStorage: TokenStorageService ) { }

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

    this.bookService.getBookById(this.id).subscribe(data =>{
    this.book = data;


    if(data.bookStock==0){
      this.isBookStockIn = false;
    }
  

    });

    this.registerForm();
   // this.findAllCommentBookId();
   
    this.getByBookIdPageable(this.id,this.page,this.commentList);
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

  buttonTest(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
      console.log(this.pageableComment);
      
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
              })).subscribe(food=>{
            
                Swal.fire(
                  'Yorumunuz Eklendi!',
                  '',
                  'success'
                )
                
              /*  if(payload.id == null){
                  this.form?.reset();
                }*/
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
