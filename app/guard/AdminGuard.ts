import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenStorageService } from "../service/token/token-storage.service";


@Injectable()
export class AdminGuard implements CanActivate {
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
          
            this.roles = this.tokenStorage.getUser().roles;

            this.roles1 = this.tokenStorage.getUser().roles;
    
      
            
            const found = this.roles.find(datam => datam=="ROLE_ADMIN");

            if(found=="ROLE_ADMIN"){
           //  alert("admin paneline hoşgeldin")
              return true;
            }else{
             alert("yetkiniz yoktur.")
              return false;
            }

          }
      
      this.router.navigate(["/"]);
      alert("Sayfaya erişim için yetkiniz uygun degildir!");
      return false;
    }
  }