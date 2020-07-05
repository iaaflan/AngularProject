import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../_services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../_services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../_services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderSerivce: LeaderService
  ) {}

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => (this.dish = dish));
    this.promotionservice
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion));
    this.leaderSerivce
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
