import { Injectable } from '@angular/core';
import { Comment } from '../shared/Comment';
import { COMMENTS } from '../shared/Comments';

import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor() { }
  getComments(): Observable<Comment[]> {
    return of(COMMENTS).pipe(delay(2000));
  }
}
