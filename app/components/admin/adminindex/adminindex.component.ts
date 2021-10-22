import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-adminindex',
  templateUrl: './adminindex.component.html',
  styleUrls: ['./adminindex.component.scss']
})
export class AdminindexComponent implements OnInit {

  content:string | any;


  showAdminBoard = false;
  showModeratorBoard = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];


  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {




  }

}
