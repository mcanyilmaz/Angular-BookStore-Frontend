import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {


  private apiServerUrl='http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllAuthor():Observable<Author[]>{
    return this.http.get<Author[]>('http://localhost:8080/v1/getAllAuthor');
  }

  public deleteAuthor(id:number):Observable<void>{
     return this.http.delete<void>('http://localhost:8080/v1/deleteAuthor/'+id);
  }

  public getByAuthorId(id:number):Observable<Author>{
    return this.http.get<Author>('http://localhost:8080/v1/getByAuthorId/'+id);
  }

  public updateAuthor(id:number, author:Author):Observable<Object>{
    return this.http.put('http://localhost:8080/v1/updateAuthor/'+id,author);
  }

  public addAuthor(author:Author):Observable<Author>{
    return this.http.post<Author>('http://localhost:8080/v1/addAuthor/',author);
  }

  
 
 
}