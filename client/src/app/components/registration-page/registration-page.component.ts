import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  onSubmit() {
    const user = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    this.registrationForm.disable();
    this.auth.registerUser(user).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    },
      error => {
        console.error(error);
      });
  }
}
