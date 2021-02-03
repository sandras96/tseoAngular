import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: any = {};
  public user : User;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
 
 
 // @Input() isLoggedIn ;

  constructor(private router: Router, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private tokenStorage : TokenStorageService,
              private toastr : ToastrService) { }

    ngOnInit() : void {
    //  if (this.tokenStorage.getToken()) {
     //     this.isLoggedIn = true;
     //     this.roles = this.tokenStorage.getUser().roles;
    //  }

   
    }
    // signIn() {
    //   console.log("FUUUUUUUUUU")
    //   console.log("form je " +  this.form) 
    
    //   this.authService.login(this.form)
    //     .subscribe(result => { 
    //       if (result){
    //         console.log("RESLUT JE " + result.access_token)
    //         this.tokenStorage.saveToken(result.access_token);
    //         this.tokenStorage.saveUser(result);

    //         this.isLoginFailed = false;
    //         this.isLoggedIn = true;
    //         

    //         //we use snapshot because we're not staying at the same page- login,
    //         //we are not have to subscribe to queryParamMap observable
    //         let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          
    //         this.router.navigate([returnUrl || '/navbar']);
    //       }
         
    //         else  
    //         console.log("staa")
    //         this.isLoggedIn = false;
    //         this.isLoginFailed = true;

    //     });
    // }

    signIn(){
      this.authService.login2(this.form)
        .subscribe(result=>{
          console.log(result)
          if(result){
            console.log(result)
             //we use snapshot because we're not staying at the same page- login,
    //         //we are not have to subscribe to queryParamMap observable
   
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          
            // if(this.authService.userRole()=="student"){
            //   this.router.navigate([returnUrl || '/student-dashboard']);
            // }
            
            // if(this.authService.userRole()=="professor"){
            //   this.router.navigate([returnUrl || '/professor-dashboard']);
            // }
            
            
          
            this.router.navigate([returnUrl ||'/dashboard'], {relativeTo:this.route})
            this.isLoggedIn = true;
           
          
              
            
      
          }
     

        }, (err:Error) => {
          if(err.toString()==='Unauthorized'){
          
            console.log("Greska.");
            
            this.toastr.error('Login unsuccessful!','Login');
            console.log(err);
          } else{
        
            this.toastr.error('Login unsuccessful!','Login');
          }
         
        });
        
    }

   

    
  
} 

 


