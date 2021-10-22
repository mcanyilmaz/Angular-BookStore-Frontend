import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { User } from 'src/app/service/user/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

   //@ts-ignore
 message: string;

 //@ts-ignore
 selectedFile: File;


  content:string | any;


  showAdminBoard = false;
  showModeratorBoard = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];

  
  //@ts-ignore
  name: string;
  surname:string | undefined;
  email:string | undefined;
  address:string | undefined;
  userPhoneNumber:string | undefined;
  userAddress:string | undefined;
  userCreateTime:string |undefined;
  //@ts-ignore
  username:string;
  //@ts-ignore
  userId:number;
 
  getUserdata:any = {}

  getUserDataDetails:any;


  form:FormGroup | undefined;

  myUser:User | undefined;
  constructor(private tokenStorage:TokenStorageService,
    private formBuilder:FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {



    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
   
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.myUser = user;
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.userPhoneNumber = user.userPhoneNumber;
      this.userAddress = user.userAddress;
      this.username = user.username;
      this.userCreateTime = user.createTime;
      this.myUser = user;

      console.log(user);

     
    }

   

    this.userService.getUserDatam(this.username).subscribe(
      data => {
        
        
        this.getUserDataDetails = data;

        this.userPhoneNumber = this.getUserDataDetails.userPhoneNumber;
        this.userAddress = this.getUserDataDetails.userAddress;
      
        console.log(this.getUserDataDetails);
      },
    
    );

      
    }
  








  create(){
    this.form = this.formBuilder.group({
      id:[null],
      userPhoneNumber:['',[Validators.required]],
      userAddress:['',[Validators.required]]
     

    })
  }


  
  updateUser2(){
    const formData = new FormData();


    if(this.form?.valid){
          let payload = {
            username:this.username,
            userPhoneNumber:this.form?.controls['userPhoneNumber'].value,
            userAddress:this.form?.controls['userAddress'].value
          }
         
            const jsonStringPayload = JSON.stringify(payload);

            if(this.selectedFile){
              formData.append('imageFile',this.selectedFile)
              formData.append('payload',jsonStringPayload);
            }


            console.warn(payload);
            setTimeout(()=>{

              //this.onUpload();
              this.userService.setUserData2(formData).pipe(catchError(err => {
                console.warn(payload);
               
                throw  err;
              })).subscribe(food=>{
               // this.getAllAuthor();
              
              });
            },1000)
           
    
          
    }
  }
  



  public update(){

    if(this.form?.valid){
      let payload = {
        username:this.username,
        userPhoneNumber:this.form?.controls['userPhoneNumber'].value,
        userAddress:this.form?.controls['userAddress'].value
      }
    
      //console.warn(payload);

       this.userService.setUserData(payload).pipe(catchError(err => {
      
          throw  err; 
        })).subscribe(data=>{
         
          this.getUserdata = data;

          this.userAddress = this.getUserdata.userAddress;

          this.userPhoneNumber = this.getUserdata.userPhoneNumber;
 
          console.log(this.getUserdata);
          

        });
 
}

   

  }


        //@ts-ignore
    public onFileChanged( event) {
      //Select File
      this.selectedFile = event.target.files[0];
    
    
    }

}
