import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(): void {
    this.loginForm = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    });
  }

  // async makeLogin() {
  //   try{
  //     if (this.loginForm.valid) {
  //       await
  //         this.authService.authUser(this.loginForm.valid);
  //         this.router.navigate(["/products"]);
  //     }
  //   } catch (error) {
  //     alert('E-mail ou Senha está incorreto! [Insira Novamente]');
  //     console.error(error);
  //   }
  // }
}
