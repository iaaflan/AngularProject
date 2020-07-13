import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../_services/dish.service';
import { Dish } from '../shared/Dish';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  errMess: string;
  dishes: Dish[];
  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL
  ) {}
  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      (errmess) => (this.errMess = errmess as any)
    );
  }
}
