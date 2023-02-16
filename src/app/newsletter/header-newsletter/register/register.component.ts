import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private registerService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(): void {
    this.registerForm = this.formBuilder.group({
      "id": [null],
      "name": [null, Validators.required],
      "email": [null, Validators.required, Validators.email],
      "password": [null, Validators.required]
    });
  }

  // async makeRegister(): void {
  //   try {} catch {}
  // }
}
