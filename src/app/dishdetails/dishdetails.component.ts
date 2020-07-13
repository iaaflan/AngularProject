import { Component, OnInit, Input } from '@angular/core';
import { DishService } from '../_services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/Dish';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Review } from '../shared/Review';
import { ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetails',
  animations: [visibility(), flyInOut(), expand()],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css'],
})
export class DishdetailsComponent implements OnInit {
  dishes: Dish[];
  formatLabel;
  dishIds: string[];
  dish: Dish;
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;
  visibility = 'shown';

  feedbackForm: FormGroup;
  feedback: Review;
  @ViewChild('feedbackform') feedbackFormDirective;

  formErrors = {
    name: '',
    star: 3,
    message: '',
  };

  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.',
      maxlength: 'Name cannot be more than 25 characters long.',
    },

    message: {
      required: 'Comment is required.',
      minlength: 'Comment must be at least 2 characters long.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject('BaseURL') public BaseURL
  ) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      star: ['5'],
      message: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // reset form validation.
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    /**
     * this.comment = this.commentForm.value;
     * this.comment.date = new Date().toISOString();
     * console.log(this.comment);
     * this.dish.comments.push(this.comment)
     * this.commentFormDirective.resetForm()
     * this.feedbackForm.reset({name: '',star: 5,message: '',});
     */
    // console.log(new Date().toISOString);
    const rating: any = this.feedbackForm.get('star').value;
    const comment: string = this.feedbackForm.get('message').value;
    const author: string = this.feedbackForm.get('name').value;
    const date: string = this.getCurrentDate();
    this.dishcopy.comments.push({ rating, comment, author, date });
    this.dishService.putDish(this.dishcopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      (errmess) => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = errmess as any;
      }
    );

    this.dish.comments.push({ rating, comment, author, date });
    // console.log(push);
    this.feedbackFormDirective.resetForm({ name: '', message: '', star: 5 });
    this.feedbackForm.reset({
      name: '',
      star: 5,
      message: '',
    });
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.dishService.getDishIds().subscribe(
      (dishIds) => (this.dishIds = dishIds),
      (errmess) => (this.errMess = errmess as any)
    );


    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this.dishService.getDish(+params['id']);
        })
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        (errmess) => (this.errMess = <any>errmess)
      );
  }

  getCurrentDate(): string {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = dateObject.getFullYear();
    const dateStr = date + '/' + month + '/' + year;
    return dateStr;
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}

// {{value}}
// [property] = "value"
// (event) = "handler"
// [(ngModel)] = "property"
