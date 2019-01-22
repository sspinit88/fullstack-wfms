import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;


  constructor(
      private router: Router,
      private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(
          null, [Validators.required, Validators.email],
      ),
      'password': new FormControl(
          null, [Validators.required, Validators.minLength(6)],
      ),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    console.log(this.form.value);
    this.aSub = this.authService.register(this.form.value)
        .subscribe(
            () => {
              this.router.navigate(['/login'], {
                queryParams: {
                  registered: true,
                }
              });
            },
            error => {
              MaterialService.toast(error.error.message);
              // console.log(error);
              this.form.enable();
            }
        );
  }

}
