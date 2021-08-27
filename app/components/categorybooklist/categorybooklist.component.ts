import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/Book/book.service';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-categorybooklist',
  templateUrl: './categorybooklist.component.html',
  styleUrls: ['./categorybooklist.component.scss']
})
export class CategorybooklistComponent implements OnInit {

  
  //@ts-ignore
  id:number;
 //@ts-ignore
  book:Book;

  //@ts-ignore
  book1: Book[];

  constructor(private route:ActivatedRoute,
    private bookService:BookService,
    private categoryService: CategoryService,
    private router:Router) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];

    //this.book = new Book();

    this.bookService.getByCategoryId(this.id).subscribe(data =>{
    this.book1 = data;
    });

  }

  categoryOneBookDetails(id:number){

    this.router.navigate(['categoryBookListDetails',id]);

  }


}