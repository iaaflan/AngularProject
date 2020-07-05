import { Component, OnInit } from '@angular/core';
import { DishService } from '../_services/dish.service';
import { Dish } from '../shared/Dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

  constructor(private dishService: DishService) {}
  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => (this.dishes = dishes));
  }
}
