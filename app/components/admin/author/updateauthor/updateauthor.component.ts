import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/service/AuthorService/author.service';

@Component({
  selector: 'app-updateauthor',
  templateUrl: './updateauthor.component.html',
  styleUrls: ['./updateauthor.component.scss']
})
export class UpdateauthorComponent implements OnInit {

 //@ts-ignore
 id:number;

 //@ts-ignore
 author:Author;

 constructor(private authorService:AuthorService,
   private route:ActivatedRoute) { }

 ngOnInit(): void {
   this.id = this.route.snapshot.params['id'];
   this.authorService.getByAuthorId(this.id).subscribe(data=>{
     this.author=data;
   },error => console.log(error));

 }

 public updateAuthor(){
   this.authorService.updateAuthor(this.id,this.author).subscribe(data=>{
     console.log(data);

   },error => console.log(error));
 }



}
