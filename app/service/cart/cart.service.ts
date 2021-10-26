import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookService } from '../Book/book.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public bookList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private bookService:BookService) { }
  getBooks(){
    return this.bookList.asObservable();
    //return this.bookService.pageableBook3(1,4)
  }

  setProduct(book : any){
    this.cartItemList.push(...book);
    this.bookList.next(book);
  }
  addtoCart(book : any){
    this.cartItemList.push(book);
    this.bookList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.bookPrice;
    })
    return grandTotal;
  }
  removeCartItem(book: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(book.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.bookList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.bookList.next(this.cartItemList);
  }
}