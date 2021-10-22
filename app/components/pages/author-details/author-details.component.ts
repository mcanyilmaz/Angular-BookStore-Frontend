import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/service/AuthorService/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  //@ts-ignore
  getAuthorName:any;

  
  //@ts-ignore
  id:number;

  //@ts-ignore
  author:Author;

 

  constructor(private route: ActivatedRoute,
    private authorService:AuthorService,
    private httpClient:HttpClient
    ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getAuthorName = this.route.snapshot.params['setAuthorName'];

    console.log(this.getAuthorName);
    //this.book = new Book();

    this.authorService.getByAuthorId(this.id).subscribe(data =>{
    this.author = data;

    console.log("test data " + data.imageName);
   
    this.getImageName(data.imageName);

   // this.getAuthorName = data.authorName;
  });
  


  }

  getImageId() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/getImageId/'+this.id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }



  getImageName(authorImageName:string) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/'+authorImageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


}