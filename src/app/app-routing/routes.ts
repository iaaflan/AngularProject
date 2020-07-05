import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
// import { DishdetailComponent } from '../dishdetails/dishdetails.components;
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailsComponent } from '../dishdetails/dishdetails.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dishdetail/:id', component: DishdetailsComponent },
  { path: '**', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
