import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent implements OnInit {

  // @ts-ignore
  id:number;

  // @ts-ignore
  book:Book;
  constructor(private route:ActivatedRoute,
              private bookService:BookService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    //this.book = new Book();

    this.bookService.getBookById(this.id).subscribe(data =>{
    this.book = data;
    });

  }

}
