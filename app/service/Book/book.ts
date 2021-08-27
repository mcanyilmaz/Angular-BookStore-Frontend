import { Author } from "../AuthorService/author";
import { Category } from "../Category/category";

export interface Book {

    
        id:number;
        bookName:string;
        bookAuthor:string;
        bookPrice:number;
        bookStock:number;
        bookDetails:string;
        authorId : number;
        category_id:number;
        author:Author;
      
        category:Category;
  



}
