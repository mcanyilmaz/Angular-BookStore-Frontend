import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenStorageService } from "../service/token/token-storage.service";


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private tokenStorage:TokenStorageService , private router: Router) {}
  

    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];

    //@ts-ignore
    roles1:string;

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {

        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            
           return true;
          }
      
      this.router.navigate(["/"]);
     // alert("Sayfaya erişim için sisteme giriş yapmalısınız!");
      return false;
    }
  }