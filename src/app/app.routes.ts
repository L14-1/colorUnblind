import { Routes } from '@angular/router';
import { DetailComponent } from './routes/detail/detail.component';
import { FavoritesComponent } from './routes/favorites/favorites.component';
import { HomeComponent } from './routes/home/home.component';

import { AboutComponent } from './routes/about/about.component';
import { SettingsComponent } from './routes/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'detail/:hexvalue', component: DetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];
