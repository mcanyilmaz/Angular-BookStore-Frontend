
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/service/Book/book';
import { BookService } from 'src/app/service/Book/book.service';
import { OrdersService } from 'src/app/service/orders/orders.service';
import Swal from 'sweetalert2';
import {catchError} from "rxjs/operators";
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {


  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  isBookStockIn=true;

  isLoggedIn = false;
  isLoginFailed = false;
  //@ts-ignore
  bookId:number;

  //@ts-ignore
  book:Book;



  sumProductPrice:number=0;
  totalPrice:number = 0;
  shippingPrice:number = 5;

  quantity:number=1;
  i=1;

  form:FormGroup |undefined;

  user:any;


  clearToBasket:Boolean=false;
  


  constructor(private router:Router,
    private route:ActivatedRoute,
    private bookService:BookService,
    private httpClient:HttpClient,
    private formBuilder:FormBuilder,
    private orderService:OrdersService,
    private tokenStorage:TokenStorageService) { 
   
  }

  ngOnInit(): void {
   
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
     
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      
      this.user = user;
      
      
    }


    this.bookId=this.route.snapshot.params['id'];
    this.getBookId(this.bookId);

   
  
  }
  

  clearBasket(){
    this.clearToBasket=true;

  }

 

  complateTheOrder(bookName:string,bookPrice:number,bookStock:number){

    let payload={
      bookId:this.bookId,
      bookName:bookName,
      bookPrice:bookPrice,
      totalPrice:this.totalPrice,
      bookPiece:this.i,
      address:this.user.userAddress,
      username:this.user.username

    }

    console.log(payload.bookId);


      this.orderService.addOrder(payload).pipe(catchError(err => {
       

        Swal.fire(
          'Sipariş Tamamlanamadı ! ',
          '',
          'warning'
        )
          throw  err; 
          
        })).subscribe(data=>{

        /*  this.i= bookStock-this.i;
          console.log(this.i);
          console.log(payload.bookName);
          
            this.bookService.updatedBookStock(payload.bookName,this.i).subscribe(
              (data)=>{
                console.log(data);
                console.log(this.i);
               // this.authors = data;
              },(error : HttpErrorResponse)=>{
                alert(error.message);
              }
            );*/

        });

        let timerInterval:any;
 
        Swal.fire({
          icon: 'success',
          title: 'Siparişiniz Başarıyla tamamlandı.',
          html:
            'Yönlendiriliyorsunuz <strong></strong> saniye.<br/><br/>',
        
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()

            timerInterval = setInterval(() => {
              //@ts-ignore
              Swal.getHtmlContainer().querySelector('strong')
              //@ts-ignore
                .textContent = (Swal.getTimerLeft() / 1000)
                  .toFixed(0)
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })

       setTimeout(this.navigateToUserOrders.bind(this),3000);



        
        //this.router.navigate(['/userOrders']);


  }


  navigateToUserOrders(){
    this.router.navigate(['/userOrders']);
  }

  plus(bookPrice:number){

    if(this.i== this.book.bookStock){
         
      Swal.fire(
        'Dikkat ! ',
        'Bu üründen Stokta yalnızca ' +  this.book.bookStock  + ' adet Kaldı. Daha fazla Satın alamazsınız.',
        'warning'
      )
    }
   

    else{
        this.i++;
      
       
        this.quantity = this.i;
        
        this.sumProductPrice = bookPrice * this.quantity;

        if(this.sumProductPrice>=100){
          console.log("sipariş 100 tl den fazla kargo ücretsiz");
          this.totalPrice = this.sumProductPrice;
        }else{

          this.totalPrice = this.shippingPrice + this.sumProductPrice;
          console.log(this.sumProductPrice);
        }

       
      
    }

    
    if(this.i==10 ){
      Swal.fire(
        'Dikkat ! ',
        'Bu üründen yalnızca 10 adet satın alınabilir.',
        'warning'
      )
     
      
    }



   
  }

  minus(bookPrice:number){
    if(this.i !=1){
      this.i--;
      this.quantity=this.i;
      this.sumProductPrice = this.sumProductPrice-bookPrice;

      if(this.sumProductPrice<100){
        this.totalPrice = this.shippingPrice + this.sumProductPrice;

      }else{
        this.totalPrice =  this.sumProductPrice;

      }

      
      console.log(this.sumProductPrice);

    }
  }

 
  




  createOrderSetData(book:Book){
    this.form = this.formBuilder.group({
      bookName:[book.bookName],
      bookPrice:[book.bookPrice],
      address:[''],

    })
  }

  createOrderPostData(){
    if(this.form?.valid){
    let payload = {
      bookName:this.form?.controls['bookName'].value,
      bookPrice:this.form?.controls['bookPrice'].value,
      address:this.form?.controls['address'].value
    }
  

        this.orderService.addOrder(payload).subscribe(data =>{
        
          console.log(data);
      
        })
  }

  }
  


  getImage(bookImageName:string) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/'+bookImageName)
      .subscribe(
        res => {
      
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  public getBookId(id:number){
    this.bookService.getBookById(id).subscribe(
      data =>{
      
        console.log(data);
       this.book = data;

       this.sumProductPrice = data.bookPrice;
       this.totalPrice = this.sumProductPrice + this.shippingPrice;
       this.getImage(data.bookImageName);

       this.createOrderSetData(this.book);
      }
    )
  }

}
