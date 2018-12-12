import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  onSubmit() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    console.log(user);
    this.loginForm.disable();
    this.auth.loginUser(user).subscribe(data => {
      this.router.navigate(['./recipes']);
    },
      error => {
        console.error(error);
      });
  }

}
