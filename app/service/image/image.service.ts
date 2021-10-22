import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../slider/slider';
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
    return this.httpClient.get<Image[]>('http://localhost:8080/slider/getAll/');

  }

  public getImagesInSlider(): Observable<Slider[]>{
    return this.httpClient.get<Slider[]>('http://localhost:8080/slider/getAll/');

  }

  public getImagesInSliderViewTrue(): Observable<Slider[]>{
    return this.httpClient.get<Slider[]>('http://localhost:8080/slider/getAllSliderViewTrue/');

  }


  /*public updateImageInSliderTrueOrFalse(id:number,data:any):Observable<Object>{
    return this.httpClient.put<Object>('http:localhost:8080/slider/updateSliderImageView/'+id,"false");
  }*/

  public updateImageInSliderTrueOrFalse(id:number,state:any):Observable<Object>{
    return this.httpClient.put<Object>('http://localhost:8080/slider/updateSliderImageView/'+id+'?state=',state);
  }




  public getOneImage(): Observable<Image[]>{
    return this.httpClient.get<Image[]>('http://localhost:8080/image/get/');

  }
  
  public addSlider(body:any):Observable<Slider>{
    return this.httpClient.post<Slider>('http://localhost:8080/slider/upload/',body);
  }

  public deleteSliderImage(id:number):Observable<Object>{
    return this.httpClient.delete('http://localhost:8080/slider/deleteSliderImageById/'+id);
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
