import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  // по умолчанию режим добавления
  isNew = true;


  constructor(
      private activatedRoute: ActivatedRoute,
      private categoriesService: CategoriesService,
  ) {
  }

  ngOnInit() {
    // initialization form
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
    });

    // старый подход
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     // значит редактируем форму
    //     this.isNew = false;
    //   }
    // });

    // новый подход получения id и вывода категории
    this.activatedRoute.params
        .pipe(
            switchMap(
                (params: Params) => {
                  if (params['id']) {
                    this.isNew = false;
                    return this.categoriesService.getCategoryById(params['id']);
                  }
                  else {
                    return of(null);
                  }
                }
            )
        ).subscribe(
          category => {
            if (category) {
              this.form.patchValue({name: category.name});
              // исправляем ошибку отображения label
              MaterialService.updateTextInputs();
            }
          },
          error => MaterialService.toast(error),
        );
  }

  onSubmit() {
    console.log(this.form);
  }


}
