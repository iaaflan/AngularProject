import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../_services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Leader } from '../shared/Leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  constructor(private leaderService: LeaderService) {}

  ngOnInit(): void {
    this.leaderService
      .getLeaders()
      .subscribe((leaders) => (this.leaders = leaders));
  }
}
