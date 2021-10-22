import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl='http://localhost:8080/v1/';

  constructor(private http:HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  ///getUserDatam(userName:string): Observable<Object> {
   // return this.http.get<Object>(API_URL + 'getUserData?userName='+userName);
  //}

  getUserDatam(userName:string): Observable<Object> {
    return this.http.get<Object>(this.apiServerUrl+'getUserData?userName='+userName);
  }



  setUserData(body:any):Observable<Object>{
    return this.http.put(this.apiServerUrl+'addUserDataDetails/',body);
  }



  public setUserData2(body:any):Observable<Object>{
    return this.http.put(this.apiServerUrl+'addUserDataDetails/',body);
  }

  

/*
  public addUser2(user:User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/v1/addUser/',user);

  }

  public userControls(body:any): Observable<User>{
    return this.http.post<User>('http://localhost:8080/v1/findByEmailAndPassword/',body);

  }

  public getAllUser():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/v1/getAllUser/');
  }

  public userControls2(body:any):Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/v1/findByEmail/'+body);

  }

  

 


  public addUser(body:any): Observable<User>{
    return this.http.post<User>('http://localhost:8080/v1/addUser/',body);

  }

*/


}
