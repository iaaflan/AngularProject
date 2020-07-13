import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Feedback, CONTACTTYPE } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';

import { FeedbackService } from '../_services/feedback.service';
@Component({
  selector: 'app-contact',
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbacklist: Feedback[];
  ferrMess: string;
  contactType = CONTACTTYPE;
  errMess: string;
  feedbackCopy: Feedback;
  visibility = 'shown';

  @ViewChild('feedbackform') feedbackFormDirective;

  formErrors = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  validationMessages = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') public BaseURL
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(
      (feedbacklist) => (this.feedbacklist = feedbacklist),
      (ferrMess) => (this.ferrMess = ferrMess)
    );
    this.feedbackCopy = this.feedback;
  }
  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
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
    // firstname: '',
    // lastname: '',
    // telnum: '',
    // email: '',
    // agree: false,
    // contacttype: 'None',
    // message: '',
    // console.log(this.feedback);
    // const firstname: any = this.feedbackForm.get('firstname').value;
    // const lastname: string = this.feedbackForm.get('lastname').value;
    // const telnum: number = this.feedbackForm.get('telnum').value;
    // const email: any = this.feedbackForm.get('email').value;
    // const contacttype: string = this.feedbackForm.get('contacttype').value;
    // const message: string = this.feedbackForm.get('message').value;

    this.feedbackService.getFeedback().subscribe(
      (feedbacklist) => (this.feedbacklist = feedbacklist),
      (ferrMess) => (this.ferrMess = ferrMess)
    );

    this.feedback = this.feedbackForm.value;
    this.feedbackCopy = this.feedback;

    //console.log(this.feedbackCopy);
    this.feedbackService.putFeedback(this.feedbackCopy).subscribe(
      (feedback) => {
        this.feedback = feedback;
        this.feedbackCopy = feedback;
      },
      (errmess) => {
        this.feedback = null;
        this.feedbackCopy = null;
        this.errMess = errmess as any;
      }
    );

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }
}
