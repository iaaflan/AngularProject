import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor() {}
  error = false;
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }
  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(
      delay(2000)
    );
    // return DISHES.filter((dish) => dish.id === id)[0];
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
