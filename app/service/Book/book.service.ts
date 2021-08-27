import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 
  private apiServerUrl='http://localhost:8080';
  constructor(private http:HttpClient) {
  }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:8080/v1/getAllBook');

  }

  //kitapları Oluşturulma zamanına göre Sıralı ASC & DESC Şeklinde çektim
  public getBookSort(): Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:8080/v1/getByBookCreateDate');

  }


  public addBook(book : Book): Observable<Book>{
    return this.http.post<Book>('http://localhost:8080/v1/addBook',book);

  }

  public deleteBook(id:number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/v1/deleteBook/'+id);
  }

   public deleteBook1(id:number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/v1/deleteBook/'+id);
  }

  public updateBook(id : number, book: Book): Observable<Object>{
    return this.http.put('http://localhost:8080/v1/updateBook/'+id,book);

  }
  public getBookById(id:number):Observable<Book>{
    return this.http.get<Book>('http://localhost:8080/v1/findByBookId/'+id);

  }

  public getByCategoryId(id:number):Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:8080/v1/getByCategoryId/'+id);

  }

  


  public getByBookName2(bookName:string):Observable<Book>{
    return this.http.get<Book>('http://localhost:8080/v1/findByBookName/'+bookName);
  }


  public getByBookName(bookName:string):Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:8080/v1/findByBookName/'+bookName);
  }

}
