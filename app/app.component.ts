import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './service/token/token-storage.service';
import { User } from 'src/app/service/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];



  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {

    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
     
    }

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      

      
    }




    
  }

 
}
