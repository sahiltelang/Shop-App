import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;

  //Alert-bar
  message:string = '';
  isProcessing = false;
  className = 'd-none';

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) {
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],

    })
   }

  ngOnInit(): void {
  }

  login() {
    this.isProcessing = true;
    const data = this.form.value;
    this.authService.signin(data)
        .subscribe(
          res => {
            if(res.success) {
              localStorage.setItem('token', res.token);
              this.isProcessing = false;
              this.message = "Login successfull!"
              this.className = 'alert alert-success'
              this.router.navigate(['/profile']);
            } else {
              this.isProcessing = false;
              this.message = res.message
              this.className = 'alert alert-danger'
            }
          },
          err => {
            this.isProcessing = false;
            this.message = "Server error"
            this.className = 'alert alert-danger'
          }
        )
  }

  getClassName() {
    return this.className;
  }
}
