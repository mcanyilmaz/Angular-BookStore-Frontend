import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author } from 'src/app/service/AuthorService/author';
import { AuthorService } from 'src/app/service/AuthorService/author.service';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.scss']
})
export class AddauthorComponent implements OnInit {

  constructor(private authorService:AuthorService) { }

  ngOnInit(): void {
  }

  public onAddAuthor(addForm:NgForm):void{

    this.authorService.addAuthor(addForm.value).subscribe(
      (data:Author)=>{
        console.log(data);
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )

  }



}
