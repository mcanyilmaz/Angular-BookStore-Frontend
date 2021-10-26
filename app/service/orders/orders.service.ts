import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  private apiServerUrl='http://localhost:8080/v1/';


  public newAddOrder(body:any):Observable<Object>{
    return this.http.post<Object>(this.apiServerUrl+'newAddOrder/',body);
  }

  public updateOrderState(id:number,body:any):Observable<Object>{
    return this.http.put(this.apiServerUrl+'updateOrderState/'+id+'?state=',body);
  }

  public findAllOrderByUsername(userName:string):Observable<Orders[]>{
    return this.http.get<Orders[]>(this.apiServerUrl+'findAllOrderByUsername/?userName='+userName);
  }

  public getAllOrders():Observable<Orders[]>{
    return this.http.get<Orders[]>(this.apiServerUrl+'getAllOrder');
  }


  public deleteBookOrder(id:number):Observable<void>{
    return this.http.delete<void>(this.apiServerUrl+'deleteOrder/'+id);
  }

  public addOrder(body:any):Observable<Object>{
    return this.http.post<Object>(this.apiServerUrl+'addOrder/',body);
  }

}
