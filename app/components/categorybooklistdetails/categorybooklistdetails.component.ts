import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';

@Component({
  selector: 'app-categorybooklistdetails',
  templateUrl: './categorybooklistdetails.component.html',
  styleUrls: ['./categorybooklistdetails.component.scss']
})
export class CategorybooklistdetailsComponent implements OnInit {

 //@ts-ignore
 id:number;
 //@ts-ignore
  book:Book;

  //@ts-ignore
  book1: Book[];
  constructor(private bookService:BookService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];

    this.bookService.getBookById(this.id).subscribe(data =>{
    this.book = data;
    });
  }

}
