import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerAddress!: FormGroup;
  convertedAddress: string | undefined;
  groupInfosAddress: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private registerService: AuthService,
  ) {}

  ngOnInit(): void {
    this.buildingAddress();
    this.buildingForm();
  }

  buildingAddress(): void {
    this.registerAddress = this.formBuilder.group({
      "cep": [null, Validators.required],
      "neighborhood": [null, Validators.required],
      "street": [null, Validators.required],
      "houseNumber": [null, Validators.required]
    });
  }

  convertingAddress(): string {
    const cep = String(this.registerAddress.value.cep);
    const neighborhood = this.registerAddress.value.neighborhood;
    const street = this.registerAddress.value.street;
    const houseNumber = String(this.registerAddress.value.houseNumber);

    this.groupInfosAddress.push(cep + ', ' + neighborhood + ', ' + street + ', ' + houseNumber);
    this.convertedAddress = this.groupInfosAddress.join("");

    return this.convertedAddress;
  }

  buildingForm(): void {
    this.registerForm = this.formBuilder.group({
      "name": [null, Validators.required],
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required],
      "address": [null],
    });
  }

  async makeRegister() {
    this.registerForm.value.address = this.convertingAddress();

    try {
      if(this.registerForm.valid && this.registerAddress.valid) {
        await
          this.registerService.createUser(this.registerForm.value);
          this.registerForm.reset();
      }
    } catch(error) {
      console.error(error);
    }
  }
}
