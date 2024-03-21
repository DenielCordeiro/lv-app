import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { ResidenceModel } from 'src/app/models/residence.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  convertedAddress: string | undefined;
  groupInfosAddress: string[] = [];
  formIsAdvance: boolean = false;
  residenceData!: ResidenceModel;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: AuthService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(): void {
    this.registerForm = this.formBuilder.group({
      "name": [null, Validators.required],
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required],
      "cellphone": [null, Validators.required],
      "postalCode": [null, Validators.required],
      "neighborhood": [null, Validators.required],
      "street": [null, Validators.required],
      "houseNumber": [null, Validators.required],
    });
  }

  async makeRegister() {
    try {
      if(this.registerForm.valid) {
        await
          this.registerService.createUser(this.registerForm.value);
          this.registerForm.reset();
      }
    } catch(error) {
      console.error(error);
    }
  }

  getResidence(): void {
    this.searchResidence(this.registerForm.value.postalCode)
  }

  async searchResidence(postalCode: string): Promise<void> {
    const postalCodeNumber = Number(postalCode);

    try {
      if (postalCode != null) {
        await
          this.registerService.searchPostalCode(postalCodeNumber)
            .then(result => {
              this.residenceData = result;
              console.log(this.residenceData);

              return;
            })
      }
    } catch(error) {
      console.error(error);
    }
  }

  formAdvance(): boolean {
    return this.formIsAdvance = !this.formIsAdvance;
  }
}
