import { Book } from "../Book/book";
import { User } from "../user/user";

export interface Comments {

    id:number;

    comment:string;
    
    bookId:number;

    createTime:string;

    userId:number;

    user:User;

    book:Book;

}
