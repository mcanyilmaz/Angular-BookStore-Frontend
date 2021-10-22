import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from './comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  private apiServerUrl='http://localhost:8080/v1/';


  public getByBookIdPageable(bookId:number,pageSize:number,commentsList:number): Observable<Comments[]>{
    return this.http.get<Comments[]>(this.apiServerUrl+'getByBookIdPageable/?id='+bookId+'&pageSize='+pageSize+'&commentList='+commentsList);

  }




  public getComments():Observable<Comments[]>{

    return this.http.get<Comments[]>(this.apiServerUrl+'getAllComments');
  }


  public findAllBookId(id:number):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.apiServerUrl+'findAllBookId/'+id);
  }
 

  public addComment(comment:Comments):Observable<Comments>{
    return this.http.post<Comments>(this.apiServerUrl+'addComment',comment);
  }

  public addComment2(body:any):Observable<Comments>{
    return this.http.post<Comments>(this.apiServerUrl+'addComment',body);
  }

  public findCommentByUserId(id:number):Observable<Comments[]>{
    return this.http.get<Comments[]>(this.apiServerUrl+'findCommentByUserId/'+id);
  }


  public deleteCommentById(id:number):Observable<Object>{
    return this.http.delete<Object>(this.apiServerUrl+'deleteComment/'+id);
  }


}
