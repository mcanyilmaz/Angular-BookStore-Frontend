import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {


  //@ts-ignore
  id:number;

  //@ts-ignore
  category:Category;
  constructor(private route:ActivatedRoute,
    private categoryService:CategoryService) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];

    //this.book = new Book();

    this.categoryService.getByCategoryId(this.id).subscribe(data =>{
    this.category = data;
   
  });
}

}
