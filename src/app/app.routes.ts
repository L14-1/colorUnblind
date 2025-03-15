import { Routes } from '@angular/router';
import { DetailComponent } from './routes/detail/detail.component';
import { HomeComponent } from './routes/home/home.component';
import { InfosComponent } from './routes/infos/infos.component';
import { FavoritesComponent } from './routes/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'detail/:hexvalue', component: DetailComponent },
  { path: '**', redirectTo: '' },
];
