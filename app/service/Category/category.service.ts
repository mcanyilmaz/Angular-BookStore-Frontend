import { HttpClient } from '@angular/common/http';
import {Injectable,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 
  category = new EventEmitter<Category[]>();

  private apiServerUrl='http://localhost:8080/v1/';
  constructor(private http: HttpClient) {
  }


  setCategory(categories:Category[]){
    this.category.emit(categories);
  }

  public getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiServerUrl+'getAllCategory');

  }

  public getByCategoryId(id:number):Observable<Category>{
    return this.http.get<Category>(this.apiServerUrl+'findByCategoryId/'+id);

  }

  public deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>(this.apiServerUrl+'deleteCategory/'+id);
  }

  public addCategory(body:any):Observable<any>{
    return this.http.post<any>(this.apiServerUrl+'addCategory/',body);
  }


  public deleteCategories(id:number):Observable<void>{
    return this.http.delete<void>(this.apiServerUrl+'deleteCategory/'+id);
 }




public updateCategory(id:number,body:any):Observable<Object>{
  return this.http.put(this.apiServerUrl+'updateCategory/'+id,body);
}

public findByCategoryNameContaining(categoryName:string):Observable<Category[]>{
  return this.http.get<Category[]>(this.apiServerUrl+'findByCategoryNameContaining/?categoryName='+categoryName);
}




}
