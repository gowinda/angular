import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthserviceService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  submitted=false
  loading=false

  constructor(
    private formBuilder:FormBuilder,
    private authservice:AuthserviceService,
    private router: Router,
  ) {
   
   }

   ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authservice.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.loading = false;
          let errorMessage = error.detail ?
            error.detail :
            'Unable to process the operation. Please contact the administrator.';
        });
  }
}
