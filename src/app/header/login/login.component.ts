import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users/users.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private modalService: NgbModal,
    public config: NgbModalConfig,
    public route: ActivatedRoute,
    public menu: MenuComponent,
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
          this.userService.authUser(this.loginForm.value)
          this.loginForm.reset();
          this.menu.changeIconBurguer();
      }
    } catch (error) {
      console.error(error);
    }
  }

  openModal(loginModal: any): void {
		this.modalService.open(loginModal);
	}

  closeModal(loginModal: any): void {
    this.menu.changeIconBurguer();
    this.modalService.dismissAll(loginModal);
  }
}
