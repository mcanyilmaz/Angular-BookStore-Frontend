import { Author } from "../AuthorService/author";
import { Category } from "../Category/category";
import { Image } from "../image/image";

export interface Book {

    
        id:number;
        bookName:string;
        //bookAuthor:string;
        bookPrice:number;
        bookStock:number;
        bookDetails:string;

        bookImageName:string;

        authorId:number;
        categoryId:number;
        author:Author;
        category:Category;

        imageModel:Image;

        
        name:string;
        picByte:any;
        type:string;
  



}
