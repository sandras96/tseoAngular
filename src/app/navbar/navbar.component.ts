import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Student } from '../model/student.model';
import { Professor } from '../model/professor.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  private roles: string[];
  isLoggedIn = false;
  userId : number;

  student : Student;
  professor : Professor;
 
  constructor(private tokenStorage : TokenStorageService,
              private router : Router) {
    
   }
   ngOnInit(): void {
     this.isLoggedIn=true;
     
     this.userId = this.tokenStorage.getUser().id;

    // this.isLoggedIn = this.authService.isLoggedIn();

    // if (this.isLoggedIn) {
      
    //     const user = this.tokenStorage.getUser();
    //     this.roles = user.authorities;
    //     this.userRole = this.authService.userRole();
    //     this.username = user.username;
    //     this.isLoggedIn = true;
     
    
    //   console.log("ROLES SU " + this.roles);
    //   console.log("TRENUTNA ROLA JE " + this.userRole)
    //   console.log("USER JE " + user.username);
  //   this.currentUser = this.authService.getCurrentUser(this.userId);
   }

 
    userRole(): string{
  //    this.isLoggedIn = this.authService.isLoggedIn();
      if(this.isLoggedIn){
          const user = this.tokenStorage.getUser();
          this.roles = user.authorities;
          if(this.roles.includes('ADMIN')){
            return 'admin';
          }
          if(this.roles.includes('STUDENT')){
            return 'student';
          }
          if(this.roles.includes('PROFESSOR')){
            return 'professor';
          }
      }
    }
    
    logout(){
    console.log("LOGOUT")
    this.isLoggedIn = false;
    this.tokenStorage.signOut();
  }
  

  goToMyProfile(){
    if(this.userRole()=='admin'){
      this.router.navigate(['users',this.userId]);
    }
    if(this.userRole()=='student'){
      this.student = JSON.parse(localStorage.getItem('currentStudent'));
      console.log("Student iz lokala je " , this.student)
      this.router.navigate(['students', this.student.id]);
    }
    if(this.userRole()=='professor'){
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
      this.router.navigate(['professors', this.professor.id]);
    }
  }

}