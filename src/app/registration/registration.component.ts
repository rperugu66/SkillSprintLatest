import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import * as alertify from 'alertifyjs';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  title = 'Registration';
  submitted = false;
  userModel = new User('', '', '', '', '');
  constructor(private api: ApiService, private http: HttpClient) {}

  onSubmit() {
    this.submitted = true;
    console.log(this.userModel);
  }
  onUserSubmit() {
    // this.submitted = true;
    // console.log(this.userModel);

    this.api.CreateUser(this.userModel).subscribe((data: any) => {
      alertify.success('saved successfully.');
    });
  }

  ngOnInit(): void {}
}
