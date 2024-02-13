import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { MenuComponent } from '../menu/menu.component';

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

  constructor(
    private formBuilder: FormBuilder,
    private registerService: AuthService,
    public route: ActivatedRoute,
    public menu: MenuComponent
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
          this.menu.changeIconBurguer();
      }
    } catch(error) {
      console.error(error);
    }
  }

  formAdvance(): boolean {
    return this.formIsAdvance = !this.formIsAdvance;
  }
}
