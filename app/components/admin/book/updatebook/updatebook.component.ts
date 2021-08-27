import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.scss']
})
export class UpdatebookComponent implements OnInit {

  // @ts-ignore
  book:Book;

  // @ts-ignore
  id:number;

  constructor(private bookService: BookService,
              private route : ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookService.getBookById(this.id).subscribe(data=>{
      this.book=data;
    },error => console.log(error));
  }

  public updateBook(){
    this.bookService.updateBook(this.id,this.book).subscribe(data=>{
      console.log(data);

    },error => console.log(error));
  }



}
