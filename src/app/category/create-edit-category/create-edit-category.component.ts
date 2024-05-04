import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, catchError, delay, map, of } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category } from '../model/category.items';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss'],
})
export class CreateEditCategoryComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup;
  headerLabel: string;
  headerHelperText: string;
  inputWrapperClass = 'col-span-full grid grid-cols-6';
  labelClass = 'col-span-2 text-sm font-medium leading-6 text-gray-900';
  inputClass =
    'w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
  inputClass1 = { 'w-full': true };
  paramMap$: Subscription;
  categoryId: string;
  categoryDetail: Category;
  success: boolean;
  redirectionTimer: any;
  formSubmitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const currentUrlPath = this.route.snapshot.url[0].path;
    this.headerLabel =
      currentUrlPath === 'edit' ? 'Edit Category' : 'Create Category';
    this.headerHelperText =
      currentUrlPath === 'edit'
        ? 'Update category details here'
        : 'Provide the category details below';

    this.categoryForm = this.fb.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
        asyncValidators: [this.isCategoryAlreadyExists()],
        updateOn: 'blur',
      }),
      description: new FormControl(''),
    });

    this.categoryId = this.route.snapshot.params['id'];
    if (this.categoryId) {
      this.getCategoryDetails();
    }
  }

  categoryExists(category: string): Observable<boolean> {
    return of(category).pipe(
      delay(500),
      map((category) => {
        const categories = ['Savings', 'Food']; // Make an API call
        return categories.includes(category);
      })
    );
  }

  isCategoryAlreadyExists(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control?.value === this.categoryDetail?.name) return of(null);

      return this.categoryExists(control?.value).pipe(
        map((exists) => {
          if (exists) {
            console.log('Category already exists');
            return { categoryExists: true };
          } else {
            return null;
          }
        }),
        catchError((err) => null!)
      );
    };
  }

  goToCategoryList() {
    // TODO: Move the string to constant file
    this.router.navigate(['categories']);
  }

  getCategoryDetails() {
    this.categoryService
      .getCategoryDetail(this.categoryId)
      .pipe(
        map((res: Category) => {
          console.log(res);
          const { name, description } = res;
          this.categoryDetail = { ...res };
          this.categoryForm.patchValue({
            name,
            description,
          });
        })
      )
      .subscribe();
  }

  categorySuccessHandler(res: unknown) {
    this.formSubmitted = true;
    console.log('categorySuccessHandler', res);
    this.success = true;
    this.redirectionTimer = setTimeout(() => {
      this.goToCategoryList();
      this.formSubmitted = false;
    }, 3000);
  }

  async categoryErrorHandler(err: Error) {
    console.error(err, 'catchError');
    this.success = false;
  }

  createCategory(categoryDetail: Category) {
    this.categoryService
      .createCategory(categoryDetail)
      .pipe(catchError(this.categoryErrorHandler))
      .subscribe(this.categorySuccessHandler.bind(this));
  }

  updateCategory(categoryDetail: Category) {
    this.categoryService
      .updateCategory(categoryDetail)
      .pipe(catchError(this.categoryErrorHandler))
      .subscribe(this.categorySuccessHandler.bind(this));
  }

  onSubmit() {
    if (!this.categoryId) {
      this.createCategory(this.categoryForm.value);
    } else {
      const categoryDetail = {
        ...this.categoryDetail,
        ...this.categoryForm.value,
      };
      console.log(categoryDetail);
      this.updateCategory(categoryDetail);
    }
  }

  ngOnDestroy() {
    if (this.paramMap$) this.paramMap$.unsubscribe();

    if (this.redirectionTimer) clearTimeout(this.redirectionTimer);
  }
}
