import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
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
          this.authService.authUser(this.loginForm.value)
          this.loginForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  openModal(loginModal: any): void {
		this.modalService.open(loginModal);
	}
}
