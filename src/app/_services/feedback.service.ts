import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getFeedback(): Observable<Feedback[]> {
    return this.http
      .get<Feedback[]>(baseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  putFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Feedback>(baseURL + 'feedback/1', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
