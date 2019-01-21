import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(
      private authService: AuthService,
      // private router = Router,
      // private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // работа с формой
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

    // this.activatedRoute.queryParams.subscribe(
    //     (params: Params) => {
    //       if (params['registred']) {
    //         // можете войти в систему, используя свои данные
    //       } else if (params['accsessDenied']){
    //         // для начала нужно авторизоваться в системе
    //       }
    //     }
    // )
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }


  onSubmit() {
    this.form.disable(); // отключаем форму после отправки данных

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };


    this.aSub = this.authService.login(user).subscribe(
        () => {
          // this.router.navigate(['/overview']);
        },
        (error) => {
          console.warn('error');
          this.form.enable(); // разблокируем форму, если вернет ошибку
        },
    );
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
