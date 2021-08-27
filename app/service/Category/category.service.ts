import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 


  private apiServerUrl='http://localhost:8080';
  constructor(private http: HttpClient) {
  }

  public getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:8080/v1/getAllCategory');

  }

  public getByCategoryId(id:number):Observable<Category>{
    return this.http.get<Category>('http://localhost:8080/v1/findByCategoryId/'+id);

  }

  public deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/v1/deleteCategory/'+id);
  }

  public addCategory(category:Category):Observable<Category>{
    return this.http.post<Category>('http://localhost:8080/v1/addCategory/',category);
  }


  public deleteCategories(id:number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/v1/deleteCategory/'+id);
 }


 public updateCategory(id:number,category:Category):Observable<Object>{
  return this.http.put('http://localhost:8080/v1/updateCategory/'+id,category);
}


}
