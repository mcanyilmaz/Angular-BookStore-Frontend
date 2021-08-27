import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from './image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
 //@ts-ignore
 selectedFile: File;
 retrievedImage: any;
 base64Data: any;
 retrieveResonse: any;
 //@ts-ignore
 message: string;
 imageName: any;


  constructor(private httpClient:HttpClient) { }



  public getImages(): Observable<Image[]>{
    return this.httpClient.get<Image[]>('http://localhost:8080/image/getAll/');

  }
/*
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/getAll/')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }*/



}
