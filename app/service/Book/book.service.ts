import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Category/category';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 
  private apiServerUrl='http://localhost:8080/v1/';
  constructor(private http:HttpClient) {
  }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'getAllBook');

  }

  //kitapları Oluşturulma zamanına göre Sıralı ASC & DESC Şeklinde çektim
  public getBookSort(): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'getByBookCreateDate');

  }


  public pagebleBook(pageSize:number): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'pageableBook2/?pageSize='+pageSize);

  }

  public pageableBook3(id:number,pageSize:number): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'pageableBook3/?id='+id+'&pageSize='+pageSize);

  }

  

  public pagebleBooks(pageSize:number){
    return this.http.get(this.apiServerUrl+'pageableBook2/?pageSize='+pageSize);

  }


  /*public addBook(book : Book): Observable<Book>{
    return this.http.post<Book>('http://localhost:8080/v1/addBook',book);

  }*/

  public addBook2(body : any): Observable<Object>{
    return this.http.post<Object>(this.apiServerUrl+'addBook',body);

  }


  public addBook(body : any): Observable<Object>{
    return this.http.post<Object>(this.apiServerUrl+'addBook',body);

  }



  public deleteBook(id:number):Observable<void>{
    return this.http.delete<void>(this.apiServerUrl+'deleteBook/'+id);
  }

   public deleteBook1(id:number):Observable<void>{
    return this.http.delete<void>(this.apiServerUrl+'deleteBook/'+id);
  }

  public updateBook(id : number, book: Book): Observable<Object>{
    return this.http.put(this.apiServerUrl+'updateBook/'+id,book);

  }

  public updateBook2(id:number, body:any):Observable<Object>{
    return this.http.put(this.apiServerUrl+'updateBook/',+id,body);
  }

  
  public getBookById(id:number):Observable<Book>{
    return this.http.get<Book>(this.apiServerUrl+'findByBookId/'+id);

  }

  public getByCategoryId(id:number):Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'getByCategoryId/'+id);

  }

  

  public findByBookName(bookName:string):Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'findByBookName/?bookName='+bookName);
  }


  public getByBookName(bookName:string):Observable<Book[]>{
    return this.http.get<Book[]>(this.apiServerUrl+'findByBookName/?bookName='+bookName);
  }

  public getByBookName2(bookName:string):Observable<Book>{
    return this.http.get<Book>(this.apiServerUrl+'findByBookName/?bookName='+bookName);
  }

  public updatedBookStock(bookName:string,bookStock:number):Observable<Object>{
    return this.http.put(this.apiServerUrl+'updatedBookStock/'+bookStock,bookName);
  }


search(search:string):Observable<Book[]>{
    const jsonString = localStorage.getItem('selectedUser') || '';
   
    return this.http.get<Book[]>(this.apiServerUrl+'findByBookName/?bookName=' + search)
  }


}
