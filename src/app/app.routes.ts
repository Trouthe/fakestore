import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { ClothingComponent } from './pages/clothing/clothing.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { ElectronicsComponent } from './pages/electronics/electronics.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: ':title/:id', component: ItemPageComponent },
  { path: 'clothing', component: ClothingComponent },
  { path: 'jewelery', component: JewelryComponent },
  { path: 'electronics', component: ElectronicsComponent },
];
