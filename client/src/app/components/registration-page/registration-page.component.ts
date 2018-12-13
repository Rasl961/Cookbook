import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public registrationForm: FormGroup;
  public modalRef: BsModalRef;
  public registrationErrorMessage: string;
  @ViewChild('registrationPopUp') registrationPopUp;

  constructor(private auth: AuthService, private router: Router, private modalService: BsModalService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
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
      if (data.returnMessage) {
        this.registrationErrorMessage = data.returnMessage;
        this.openRegistrationModal(this.registrationPopUp);
        this.registrationForm.reset();
      } else {
        this.router.navigate(['/login']);
      }
    },
      error => {
        console.log(error);
      });
  }
  openRegistrationModal(registrationPopUp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(registrationPopUp);
  }
}
