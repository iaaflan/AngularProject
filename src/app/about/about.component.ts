import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../_services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Leader } from '../shared/Leader';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  leaderErrMess: string;
  leaders: Leader[];
  constructor(private leaderService: LeaderService) {}

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(
      (leaders) => (this.leaders = leaders),
      (leaderErrMess) => (this.leaderErrMess = leaderErrMess as any)
    );
  }
}
