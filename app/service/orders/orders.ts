import { Author } from "../AuthorService/author";
import { Book } from "../Book/book";

export interface Orders {


    id:number;
    bookName:string;
    bookPrice:number;
    bookPiece:number;
    orderNumber:number;
    totalPrice:number;
    username:string;
    address:string;
    createTime:Date;
    state:string;


    bookList:Book[];




}
