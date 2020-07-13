import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../_services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../_services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../_services/leader.service';
import { Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderSerivce: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {}

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(
      (dish) => (this.dish = dish),
      (dishErrMess) => (this.dishErrMess = dishErrMess as any)
    );
    this.promotionservice.getFeaturedPromotion().subscribe(
      (promotion) => (this.promotion = promotion),
      (promoErrMess) => (this.promoErrMess = promoErrMess as any)
    );
    this.leaderSerivce.getFeaturedLeader().subscribe(
      (leader) => (this.leader = leader),
      (leaderErrMess) => (this.leaderErrMess = leaderErrMess as any)
    );
  }
}
