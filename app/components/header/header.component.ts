import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/service/user/user';
import { UserService } from 'src/app/service/user/user.service';
import {catchError} from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';
import { BookService } from 'src/app/service/Book/book.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  showAdminBoard = false;
  showModeratorBoard = false;
  //@ts-ignore
  username: string;

  form2:FormGroup | undefined;

  form3:FormGroup | undefined;
  form4:FormGroup | undefined;

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  loginMessage='';

  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];



  testData:User | undefined;

  userId:number| undefined;

  //@ts-ignore
  user2 : User[];
  
  users : User[] = [];

  tekUser : User | undefined;

  selectedUser: User | undefined;

  private sub:any;

 ///form:FormGroup | undefined;

 // form2:FormGroup | undefined;

  //@ts-ignore
  formGroup:FormGroup;

  operationStatus = false;

  deleteOperationMessage:any;


  tempData:string | undefined;


  testDatam: string | undefined;
  testDataAny: any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private bookService:BookService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
     
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

      this.userId = user.userId;
 
      
      this.user2 = user;
    }


  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }


  userLoginControl(){
    if(this.form2?.valid){
      let payload = {
        username:this.form2?.controls['username'].value,
        password:this.form2?.controls['password'].value
       
      }
      console.warn(payload);

      this.authService.login(payload).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.loginSuccesfullMessageAlert();
          this.roles = this.tokenStorage.getUser().roles;
          
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          
          this.loginFailedMessageAlert();
          this.loginMessage="giriş Başarısız"
          console.log(this.errorMessage);
        }
      );

      
 
    }
}



  reloadPage(): void {
    setTimeout(function(){
      window.location.reload();
   }, 2000);

    //window.location.reload();
  }


  loginGetModal(){
    this.form2 = this.formBuilder.group({
      id:[null],
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    
    })
  }

  create(){
    this.form3 = this.formBuilder.group({
      id:[null],
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required]],
      name:['',[Validators.required]],
      surname:['',[Validators.required]],

    })
  }

  registerUser(){
    if(this.form3?.valid){
      let payload = {
        username:this.form3?.controls['username'].value,
        email:this.form3?.controls['email'].value,
        password:this.form3?.controls['password'].value,
        name:this.form3?.controls['name'].value,
        surname:this.form3?.controls['surname'].value

       
      }
     
       this.authService.register(payload).pipe(catchError(err => {
        
        this.errorMessage = err.error.message;
       
        this.isSignUpFailed = true;
        console.log(this.errorMessage);
        this.registerFailedMessageAlert(this.errorMessage);
          throw  err; 
          
        })).subscribe(user=>{
       
          this.loginMessage = user.message;

          this.isSuccessful = true;
          this.isSignUpFailed = false;
          

          this.registerSuccesfullMessageAlert(this.loginMessage);

          this.reloadPage();

        });
 
}
  }


  registerFailedMessageAlert(message:string){
    Swal.fire(
      'Kayıt Edilirken Hata Oluştu!',
      message,
      'warning'
    )
  }

  loginSuccesfullMessageAlert(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Giriş Başarılı! Yönlendiriliyorsunuz.',
      showConfirmButton: false,
      timer: 2000
    })

  }

  loginFailedMessageAlert(){
    Swal.fire(
      'Giriş Başarısız!',
      'Lütfen bilgilerinizi gözden geçirin',
      'warning'
    )
  }


  registerSuccesfullMessageAlert(message:string){
 
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    })

  }


/*
  onSubmit(): void {
    console.log("te3st0");
    this.authService.register(this.form2).subscribe(
      data => {
       
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
*/




//   createLogin(){
//     this.form2 = this.formBuilder.group({
//       email:['',[Validators.required]],
//       password:['',[Validators.required]],
      
//     })
//   }

//   userControl(){
//     if(this.form2?.valid){
//       let payload = {
//         email:this.form2?.controls['email'].value,
//         password:this.form2?.controls['password'].value
       
//       }

//       setTimeout(()=>{
//        //this.userService.userControls2(payload).pipe(catchError(err => { 
//         this.userService.userControls(payload).subscribe(user=>{
//           console.log(user);
          
//           if(user.email==payload.email && user.password==payload.password){
//             console.log("degerler Eşit");
//           }else{
//             console.log("degerler Eşit degil");
//           }
//         //  this.user2 = user;

//         });
//       },1000)
     

    
// }
//   }


    
//   edit(user:User){
//     this.selectedUser = user;
//     this.form = this.formBuilder.group({
     
//       username:[user.username,[Validators.required]],
//       password:[user.password,[Validators.required]],
//       email:[user.email,[Validators.required]]
    
//     })
//   }


//   create(){
//     this.form = this.formBuilder.group({
//       id:[null],
//       username:['',[Validators.required]],
//       password:['',[Validators.required]],
//       email:['',[Validators.required]]
//     })
//   }


  
//   createOrUpdate(){
//     if(this.form?.valid){
//             let payload = {
//               id:this.form?.controls['id'].value,
//              /* bookName:this.form?.controls['username'].value,
//               bookDetails:this.form?.controls['password'].value,
//               bookPrice:this.form?.controls['email'].value  */

//             //  id:this.form?.controls['id'].value,
//               username:this.form?.controls['username'].value,
//               password:this.form?.controls['password'].value,
//               email:this.form?.controls['email'].value  
//             }
           
//             this.operationStatus = true;
//             setTimeout(()=>{
//              this.userService.addUser(payload).pipe(catchError(err => {
//               //this.bookService.addBook2(payload).pipe(catchError(err => {
//                 this.operationStatus = false;
//                 throw  err;
//               })).subscribe(food=>{
//                 this.operationStatus = false;
//                 if(payload.id == null){
//                   this.form?.reset();
//                 }
//               });
//             },1000)
           
    
          
//     }
// }

/*
  kaydet2(){
    this.form = this.formBuilder.group({
      id:[null],
      bookName:[''],
      bookDetails:[''],  
      bookPrice:['',],
      bookStock:[''],
      authorId:[''],
      categoryId:['']
    })
  }

*/
  /*
  kaydet(){
    if(this.form?.valid){
            let payload = {
              id:this.form?.controls['id'].value,
              bookName:this.form?.controls['bookName'].value,
              bookDetails:this.form?.controls['bookDetails'].value,
              bookPrice:this.form?.controls['bookPrice'].value, 
              bookStock:this.form?.controls['bookStock'].value,
              authorId:this.form?.controls['authorId'].value,
              categoryId:this.form?.controls['categoryId'].value

        
            }
           
            this.operationStatus = true;
            console.warn(payload);
            setTimeout(()=>{
          
              this.bookService.addBook2(payload).pipe(catchError(err => {
                console.warn(payload);
                this.operationStatus = false;
                throw  err;
              })).subscribe(food=>{
                this.operationStatus = false;
                if(payload.id == null){
                  this.form?.reset();
                }
              });
            },1000)
           
    
          
    }
}

*/


}
/*

onSubmit(): void {
  this.authService.login(this.form).subscribe(
    data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}

*/


