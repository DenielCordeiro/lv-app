import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(): void {
    this.loginForm = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    });
  }

  async makeLogin() {
    try{
      if (this.loginForm.valid) {
        await
          this.loginService.authUser(this.loginForm.value)
          this.loginForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  openModal(loginModal: any): void {
		this.modalService.open(loginModal);
	}

  closeModal(loginModal: any): void {
    this.modalService.dismissAll(loginModal)
  }
}
