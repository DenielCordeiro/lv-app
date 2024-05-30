import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { ResidenceModel } from 'src/app/models/residence.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  convertedAddress: string | undefined;
  groupInfosAddress: string[] = [];
  nextForm: boolean = false;
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
      "state": [null, Validators.required],
      "city": [null, Validators.required],
      "neighborhood": [null, Validators.required],
      "street": [null, Validators.required],
      "houseNumber": [null, Validators.required],
    });
  }

  makeRegister() {
    // if(this.registerForm.valid) {
    //   this.registerService.createUser(this.registerForm.value);
    //   this.registerForm.reset();
    // } else { }

    this.getResidence();
    this.searchResidence(this.registerForm.value.postalCode)
    console.log(this.registerForm);

    // this.registerService.createUser(this.registerForm.value);
    // this.registerForm.reset();
  }

  getResidence(): void {
    this.searchResidence(this.registerForm.value.postalCode);
  }

  searchResidence(postalCode: string): void {
    let postalCodeNumber = Number(postalCode);
    let state = document.querySelector('#state') as HTMLInputElement;
    let city = document.querySelector('#city') as HTMLInputElement;
    let bairro = document.querySelector('#neighborhood') as HTMLInputElement;
    let logradouro = document.querySelector('#street') as HTMLInputElement;

    if (postalCode != null) {
      this.registerService.searchPostalCode(postalCodeNumber)
        .then(result => {
          this.residenceData = result;

          this.registerForm.value.state = this.residenceData.uf;
          this.registerForm.value.city = this.residenceData.localidade;
          this.registerForm.value.neighborhood = this.residenceData.bairro;
          this.registerForm.value.street = this.residenceData.logradouro;

          state.value = this.residenceData.uf;
          city.value = this.residenceData.localidade;
          bairro.value = this.residenceData.bairro;
          logradouro.value = this.residenceData.logradouro;
        })
    } else {
      alert('Você não insiriu nenhum número de CEP.')
    }
  }

  formAdvance(): boolean {
    return this.nextForm = !this.nextForm;
  }
}
