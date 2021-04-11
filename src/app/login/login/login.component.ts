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
  roles: string[] = [];
 


  constructor(private router: Router, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private tokenStorage : TokenStorageService,
              private toastr : ToastrService) { }

    ngOnInit() : void {
   
    }
  

    signIn(){
      this.authService.login2(this.form)
        .subscribe(result=>{
          console.log(result)
          if(result){
            console.log(result)
            
            let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          
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

 


