import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {


  private apiServerUrl='http://localhost:8080/v1/';

  constructor(private http: HttpClient) {
  }

  public getAllAuthor():Observable<Author[]>{
    return this.http.get<Author[]>(this.apiServerUrl+'getAllAuthor');
  }

  public deleteAuthor(id:number):Observable<void>{
     return this.http.delete<void>(this.apiServerUrl+'deleteAuthor/'+id);
  }

  public getByAuthorId(id:number):Observable<Author>{
    return this.http.get<Author>(this.apiServerUrl+'getByAuthorId/'+id);
  }

  public updateAuthor(id:number, body:any):Observable<Object>{
    return this.http.put(this.apiServerUrl+'updateAuthor/'+id,body);
  }

  public addAuthor(author:Author):Observable<Author>{
    return this.http.post<Author>(this.apiServerUrl+'addAuthor/',author);
  }
  public addAuthor2(body:any):Observable<Author>{
    return this.http.post<Author>(this.apiServerUrl+'addAuthor/',body);
  }
  

  public pageableAuthor(id:number,pageSize:number): Observable<Author[]>{
    return this.http.get<Author[]>(this.apiServerUrl+'pageableAuthor/?id='+id+'&pageSize='+pageSize);

  }

 
 
}