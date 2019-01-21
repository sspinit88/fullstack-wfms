import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(
          null,
          [
            Validators.required,
            Validators.email,
          ]
      ),
      'password': new FormControl(
          null,
          [
            Validators.required,
            Validators.minLength(6),
          ]
      )
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  toggleError() {
    if (this.form.get('email').invalid &&
        this.form.get('email').touched
    ) {
      return 'red-text';
    }
  }
  toggleErrorPas() {
    if (this.form.get('password').invalid &&
        this.form.get('password').touched
    ) {
      return 'red-text';
    }
  }

}
