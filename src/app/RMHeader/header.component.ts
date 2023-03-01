import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {  Router } from '@angular/router';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';
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
  name: any;
  // userData: any[];
  // loginform: any;
  // varUserName: any;

  constructor(
    private router: Router,
    private api: ApiService

  
  ) { }
  // private api: ApiService // private http: HttpClient, // private builder: FormBuilder,

  //ngOnInit(): void {}

  isResourceOrSmepage() {
    const currentRoute = this.router.url;
    return currentRoute == '/resource' || currentRoute == '/SME';
  }
  // isResourceOrSmepage(): boolean {
  //   return (
  //     this.route.snapshot.url[0].path === 'resource' ||
  //     this.route.snapshot.url[0].path === 'sme'
  //   );
  // }

  ngOnInit(): void {

    this.api.getUsers().subscribe({
      next: (data: any[]) =>
      { this.name = data[0].name; }, error: (error) => { console.log(error); }
    });
  }

  signIn() {}
}
