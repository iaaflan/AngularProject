import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { of, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  getLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + 'leadership' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return DISHES.filter((dish) => dish.id === id)[0];
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
      .get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map((leadership) => leadership[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
