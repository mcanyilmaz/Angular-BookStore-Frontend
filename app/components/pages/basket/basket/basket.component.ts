import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { Book } from 'src/app/service/Book/book';
import { OrdersService } from 'src/app/service/orders/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

 
  public books : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService,private orderService:OrdersService ) { }

  ngOnInit(): void {
    this.cartService.getBooks()
    .subscribe(res=>{
      this.books = res;
      console.log(this.books);
   
      this.grandTotal = this.cartService.getTotalPrice();
    })


    
  }


  postTheBookItemsOrder(){
   // book = this.books;
    let payload = {
      bookList:this.books,
      username:'admin',
      address:"selam adresss"
  
    }

    this.orderService.newAddOrder(payload).subscribe((data => {
      console.log(data);
    }))


  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}