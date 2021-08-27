import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';

@Component({
  selector: 'app-authorlist',
  templateUrl: './authorlist.component.html',
  styleUrls: ['./authorlist.component.scss']
})
export class AuthorlistComponent implements OnInit {

  //@ts-ignore
  id: number;

  //@ts-ignore
  author: Author[];


  constructor(private authorService:AuthorService,
          private router:Router
    ) { }

  ngOnInit(): void {
    this.getAllAuthor();
  }
  
  public getAllAuthor():void{
    this.authorService.getAllAuthor().subscribe(
      (data : Author[])=>{
        this.author = data;
        },(error:HttpErrorResponse)=>{
          alert(error.message);
        });
  }


  
  deleteAuthor(id:number){
    this.authorService.deleteAuthor(id).subscribe(data=>{
      console.log(data);
      this.getAllAuthor();
    })
  }

  updateAuthor(id : number){
    this.router.navigate(['updateAuthor',id]);
  }

  authorDetails(id:number){

    this.router.navigate(['authordetails',id]);

  }

}
