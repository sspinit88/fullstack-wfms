import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {subscribeOn, switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";
import {CategoryModel} from "../../shared/models/category.model";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  // по умолчанию режим добавления
  isNew = true;
  image: File;
  imagePreview: string = '';
  category: CategoryModel;

  @ViewChild('input') inputRef: ElementRef;


  constructor(
      private activatedRoute: ActivatedRoute,
      private categoriesService: CategoriesService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    // initialization form
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
    });

    this.form.disable();

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
            this.category = category;
            // превью картинки
            this.imagePreview = category.imageSrc;
            // исправляем ошибку отображения label
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error),
    );
  }

  triggerClick() {
    // обращаемся к референции, вешаем клик и реализуем
    // функцилнал input для получения файла
    this.inputRef.nativeElement.click()
  }

  // метод будет вызываться, если будет выбран файл (реагирует на изменение)
  onFileUpload(event: any) {
    // получаем элемент
    const file = event.target.files[0];
    this.image = file;

    // раелизуем превью
    const reader = new FileReader();

    // добавляем прослушку событий на reader
    reader.onload = () => {
      // кладем результат в imagePreview
      this.imagePreview = reader.result;
    };
    // даем указание ридеру, что бы он прочитал file.
    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;

    this.form.disable();

    if (this.isNew) {
      // create
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      // update
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
        category => {
          this.category = category;
          MaterialService.toast('Изменения сохранены');
          this.form.enable();
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
    );

  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.category.name}?`);

    if (decision) {
      this.categoriesService.delete(this.category._id)
          .subscribe(
              response => {
                MaterialService.toast(response.message);
              },
              error => {
                MaterialService.toast(error.error.message);
              },
              () => {
                this.router.navigate(['/site', 'categories'])
              }
          );
    }
  }

}
