import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ApiService } from '../shared/api.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  faUser = faUser;
  collapsed = true;
  faListUl = faListUl;
  // userData: any[];
  // loginform: any;
  // varUserName: any;

  constructor() {} // private api: ApiService // private http: HttpClient, // private builder: FormBuilder,
  ngOnInit(): void {}

  signIn() {}
}
