import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CommentService } from 'src/app/service/Comment/comment.service';
import { Comments } from 'src/app/service/Comment/comments';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-book-comments',
  templateUrl: './user-book-comments.component.html',
  styleUrls: ['./user-book-comments.component.scss']
})
export class UserBookCommentsComponent implements OnInit {

  isLoggedIn = false;

  //@ts-ignore
  userId:number;
  //@ts-ignore
  selectedId:number;
  myComments:Comments[] = [];
  constructor(private commentService:CommentService,
    private router:Router,
    private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
   
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.userId = user.id;
    }

    this.getAllComments();
  }

  public getAllComments():void{

    this.commentService.findCommentByUserId(this.userId).subscribe(
      (data:Comments[])=>{
     
        this.myComments = data;
        console.log(data);
      
      },(error:HttpErrorResponse)=>{
        alert(error.message);
      })

  }

  public goToBook(id:number){
    

      this.router.navigate(['categoryBookListDetails',id]);
  
    
  }


  getUserIdForDelete(id:number){
    this.selectedId = id;
  }

  deleteBook1(){

    setTimeout(()=>{

      this.commentService.deleteCommentById(this.selectedId).pipe(catchError(err => {
            
        throw  err;
      })).subscribe(data=>{
     
        Swal.fire(
          'Silme Başarılı',
          '',
          'success'
        )
        this.getAllComments();
        });

  })

  }



}
