import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
 

  constructor(
    private router: Router, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private tokenStorage : TokenStorageService) { }

    ngOnInit() : void {
    //  if (this.tokenStorage.getToken()) {
     //     this.isLoggedIn = true;
     //     this.roles = this.tokenStorage.getUser().roles;
    //  }
    }
    signIn() {
      console.log("FUUUUUUUUUU")
      console.log("form je " +  this.form) 
      this.authService.login(this.form)
        .subscribe(result => { 
          if (result){
            console.log("RESLUT JE " + result.access_token)
            this.tokenStorage.saveToken(result.access_token);
            this.tokenStorage.saveUser(result);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().authorities;
            console.log("ROLES SU" + this.roles)

            //we use snapshot because we're not staying at the same page- login,
            //we are not have to subscribe to queryParamMap observable
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          
            this.router.navigate([returnUrl || '/navbar']);
          }
         
            else  
            console.log("staa")
            this.isLoggedIn = false;
            this.isLoginFailed = true;

        });
    }
} 

 


