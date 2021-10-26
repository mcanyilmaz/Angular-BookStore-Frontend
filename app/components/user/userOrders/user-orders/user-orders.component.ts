
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Orders } from 'src/app/service/orders/orders';
import { OrdersService } from 'src/app/service/orders/orders.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  
  orders:Orders[] = [];
 //@ts-ignore
  order:Orders;
  //@ts-ignore
  selectedOrder : Orders;

  username:string = '';

  orderCreateTime:Date | undefined;

  isLoggedIn = false;
  isLoginFailed = false;


  orderCargoPostState:Boolean = false;
  orderDeliveryPostState:Boolean =false;
  orderPreparePostState:Boolean =false;

  form:FormGroup | undefined;


  constructor(private orderService:OrdersService,
    private tokenStorage:TokenStorageService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {


   
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      
      this.username = user.username;
    }

    console.log(this.getAllOrders(this.username));


  
  }

  goToOrderBookDetail(id:number){
    this.router.navigate(["categoryBookListDetails/"+id]);
  }

  public viewOrderDetail(order:Orders){
    this.orderCargoPostState=false;
    this.orderDeliveryPostState=false;
    this.orderPreparePostState=false;

    this.selectedOrder = order;
    if(this.selectedOrder.state=="Hazırlanıyor"){
      this.orderPreparePostState=true;
  

    }

    else if(this.selectedOrder.state=="Kargoda"){
      this.orderPreparePostState=true;
      this.orderCargoPostState=true;
  

    }else if(this.selectedOrder.state=="Teslim Edildi"){
      this.orderPreparePostState=true;
      this.orderCargoPostState=true;
      this.orderDeliveryPostState = true;
    }
    console.log(this.selectedOrder);

   /* this.form = this.formBuilder.group({
      
      address:[order.address],
      bookName:[order.bookName],
    })*/


  }





  public getAllOrders(username:string):void{
    this.orderService.findAllOrderByUsername(username).subscribe(
      (data:Orders[])=>{


        this.orders = data;


        console.log("gelen data");
        console.log(this.orders);


      },(error : HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


}

  