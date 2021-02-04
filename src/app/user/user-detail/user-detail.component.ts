import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ModalService } from 'src/app/_modal';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userForDelete : User;
  currentUserId;
  @Input() user : User;
  
  constructor() { }

  ngOnInit(): void {
  
  }
 

}
