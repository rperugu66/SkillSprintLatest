import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';
  email!: string;
  password!: string;
  userData: any;

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private http: HttpClient,
    private builder: FormBuilder,
    private router: Router
  ) {}
  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  ngOnInit(): void {}

  signIn() {
    if (this.loginform.valid) {
      this.api.getUsers().subscribe((data: any[]) => {
        this.userData = data;

        var varLoginUser = this.userData.filter(
          (item: any) =>
            item.email === this.loginform.value.email &&
            item.password === this.loginform.value.password
        );
        if (varLoginUser.role === 'Associate') {
          this.router.navigateByUrl('resource');
        }
        if (varLoginUser.role === 'SME') {
          this.router.navigateByUrl('SME');
        }
        if (varLoginUser.role === 'Resource Manager') {
          this.router.navigateByUrl('company');
        }
      });
    } else {
      this.message = 'Your email or password was not valid';
    }
  }
}
