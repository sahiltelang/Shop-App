import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;

  //alert-bar
  message:string = '';
  isProcessing = false;
  className = 'd-none';

  constructor(
    private fb:FormBuilder,
    private auth:AuthService
    ) {
    this.form = this.fb.group({
      'displayName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm': ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  signup() {
    this.isProcessing = true;
    const data = this.form.value;
    delete data['confirm'];
    this.auth.signup(data)
        .subscribe(
          res => {
            if(res.success) {
              this.isProcessing = false;
              this.message = "Account created successfully!"
              this.className = 'alert alert-success'
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
