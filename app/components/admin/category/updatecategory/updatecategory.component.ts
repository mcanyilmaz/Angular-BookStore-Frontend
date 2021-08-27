import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/service/Category/category';
import { CategoryService } from 'src/app/service/Category/category.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.scss']
})
export class UpdatecategoryComponent implements OnInit {


   //@ts-ignore
 id:number;

 //@ts-ignore
 category:Category;


  constructor(private categoryService:CategoryService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.categoryService.getByCategoryId(this.id).subscribe(data=>{
      this.category=data;
    },error => console.log(error));

  }


  public updateCategory(){
    this.categoryService.updateCategory(this.id,this.category).subscribe(data=>{
      console.log(data);

 
    },error => console.log(error));
  }
 


}
