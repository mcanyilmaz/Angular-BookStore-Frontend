import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Orders } from 'src/app/service/orders/orders';
import { OrdersService } from 'src/app/service/orders/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  //@ts-ignore
  selectedOrderId:number;

  orders:Orders[] | undefined;

  form:FormGroup | undefined;

  constructor(private orderService:OrdersService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.createOrderFormData();
  }

  createOrderFormData(){
    this.form = this.formBuilder.group({
      id:[null],
      bookName:[''],
      bookPrice:[''],
      username:[''],
      address:['']
    
    })
  }

  public orderDetails(order:Orders){

    this.form = this.formBuilder.group({
      id:[order.id],
      bookName:[order.bookName],
      bookPrice:[order.bookPrice],
      username:[order.username],
      address:[order.address]
 
    })


  }

  public deleteOrderGetById(id:number){

    this.selectedOrderId = id;
    console.log("seçinlen id " + this.selectedOrderId);
  }
  public deleteOrder(){
    
    this.orderService.deleteBookOrder(this.selectedOrderId).subscribe(
      data=>{
      
        this.getAllOrders();

      }
    )
  }

  public getAllOrders(){
    this.orderService.getAllOrders().subscribe(data =>{
      console.log(data);
      this.orders = data;
    })
  }

}
