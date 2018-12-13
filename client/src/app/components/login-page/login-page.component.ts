import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public modalRef: BsModalRef;
  public loginErrorMsg: string;
  @ViewChild('loginPopUp') loginPopUp;

  constructor(private auth: AuthService, private router: Router, private modalService: BsModalService) {}

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
    this.auth.loginUser(user).subscribe(data => {
      if (data.returnMessage) {
        this.loginErrorMsg = data.returnMessage;
        this.openLoginModal(this.loginPopUp);
      }
      this.router.navigate(['./recipes']);
    },
      error => {
        console.error(error);
      });
  }
  openLoginModal(loginPopUp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(loginPopUp);
  }
}
