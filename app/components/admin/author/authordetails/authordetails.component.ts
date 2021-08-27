import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/service/AuthorService/author.service';

@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.scss']
})
export class AuthordetailsComponent implements OnInit {

  
  //@ts-ignore
  id:number;

  //@ts-ignore
  author:Author;

 

  constructor(private route: ActivatedRoute,
    private authorService:AuthorService
    ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    //this.book = new Book();

    this.authorService.getByAuthorId(this.id).subscribe(data =>{
    this.author = data;
   
  });
  
  }
}
