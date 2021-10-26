import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Orders } from 'src/app/service/orders/orders';
import { OrdersService } from 'src/app/service/orders/orders.service';
import Swal from 'sweetalert2';

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

  //@ts-ignore
  myForm:FormGroup;

  //@ts-ignore
  selectedId:number;

  constructor(private orderService:OrdersService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.createOrderFormData();
   
    this.orderStateSelectFormData();
  }

  //@ts-ignore
  onChange($event,id:number) {
  
    this.selectedId = id;
    let person = {
      state:this.myForm.controls["state"].value
    };
  
    console.log(person);
    this.orderService.updateOrderState(this.selectedId,person).subscribe((data => {
      console.log(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sipariş Durumu Değiştirildi',
        showConfirmButton: true,
       
      })

     // window.location.reload();

    }))
  

}



  orderStateSelectFormData(){
    this.myForm = this.formBuilder.group({
      id:[null],
      state:['']
     
    })
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
